import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import got from "got";
import { DecodeError, Either, EitherAsync, Maybe, parseError } from "purify-ts";
import * as API from "../api";
import { AccessTokenCodec, ListBookmarksCodec, Token } from "./types";

const ALLOWED_METHODS = ["GET"];
const API_URL = "https://instapaper.com/api/1";

class APIError extends Error {
  public report(): string {
    return `Error: API request to Instapaper failed. Reason: ${this.message}`;
  }
}

type Configuration = {
  username: Maybe<string>;
  password: Maybe<string>;
};

export default async function handler(
  request: GatsbyFunctionRequest,
  response: GatsbyFunctionResponse
): Promise<void> {
  const { method = "", query } = request;

  if (!ALLOWED_METHODS.includes(method)) {
    return response
      .status(API.HTTP.METHOD_NOT_ALLOWED)
      .json(API.formatError(`HTTP Method ${method} not allowed`));
  }

  const { username, password } = parseConfiguration();

  if (username.isNothing() || password.isNothing()) {
    return response
      .status(API.HTTP.INTERNAL_SERVER_ERROR)
      .json(
        API.formatError(
          `Invalid credentials supplied while authenticating to the Instapaper API`
        )
      );
  }

  const authorizationOrError = await getAuthorizationToken(
    username.orDefault(""),
    password.orDefault("")
  );

  const token: string = authorizationOrError.caseOf({
    Left: (error) => {
      console.error(error);
      return "";
    },
    Right: ({ secret }) => secret,
  });

  if (!token) {
    return response
      .status(API.HTTP.INTERNAL_SERVER_ERROR)
      .json(API.formatError("Could not authenticate to Instapaper API"));
  }

  const bookmarksOrError = await getBookmarks({
    token,
    limit: Number(query.limit || "25"),
  });

  bookmarksOrError
    .ifLeft((error) => {
      console.error(error);
      response
        .status(API.HTTP.INTERNAL_SERVER_ERROR)
        .json(API.formatError("Could not load Instapaper bookmarks"));
    })
    .ifRight((bookmarks) => {
      response.status(API.HTTP.OK).json(API.formatData<Bookmark[]>(bookmarks));
    });
}

const parseConfiguration = (): Configuration => ({
  username: Maybe.fromNullable(process.env.INSTAPAPER_USERNAME),
  password: Maybe.fromNullable(process.env.INSTAPAPER_PASSWORD),
});

export async function getAuthorizationToken(
  username: string,
  password: string
): Promise<Either<APIError, Token>> {
  const json = {
    x_auth_username: username,
    x_auth_password: password,
    x_auth_mode: "client_auth",
  };

  const responseType = "text";

  return EitherAsync(async ({ throwE }) => {
    try {
      const response = await got.post(`${API_URL}/oauth/access_token`, {
        json,
        responseType,
      });

      return parseAccessTokenString(response.body as string).caseOf({
        Left: (xs) => throwE(new APIError(xs)),
        Right: (_) => _,
      });
    } catch (error: any) {
      return throwE(new APIError(error.message));
    }
  });
}

type BookmarkQuery = {
  token: string;
  limit?: number;
};

type Bookmark = {
  id: number;
  title: string;
  url: string;
};

export async function getBookmarks(
  query: BookmarkQuery
): Promise<Either<APIError | DecodeError, Bookmark[]>> {
  const json = {
    limit: query.limit,
    folder_id: "starred",
  };
  const responseType = "json";
  const headers = {
    Authorization: `Bearer ${query.token}`,
  };

  return EitherAsync(async ({ throwE }) => {
    try {
      const response = await got.post(`${API_URL}/bookmarks/list`, {
        json,
        responseType,
        headers,
      });

      return ListBookmarksCodec.decode(response.body).caseOf({
        Left: (error) => throwE(parseError(error)),
        Right: (body) =>
          body.bookmarks.map((bookmark) => ({
            id: bookmark.bookmark_id,
            title: bookmark.title,
            url: bookmark.url,
          })),
      });
    } catch (error) {
      return throwE(new APIError(error.message));
    }
  });
}

function parseAccessTokenString(ts: string): Either<string, Token> {
  const parameters = new URLSearchParams(ts);

  return AccessTokenCodec.decode({
    id: parameters.get("oauth_token"),
    secret: parameters.get("oauth_token_secret"),
  });
}
