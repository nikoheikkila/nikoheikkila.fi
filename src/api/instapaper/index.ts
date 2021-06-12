import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import got from "got";
import { Codec, Either, EitherAsync, GetType, string } from "purify-ts";

const TokenCodec = Codec.interface({
  id: string,
  secret: string,
});

type Token = GetType<typeof TokenCodec>;

const ALLOWED_METHODS = ["GET"];
const API_URL = "https://instapaper.com/api/1";

class APIError extends Error {
  public report(): string {
    return `Error: API request to Instapaper failed. Reason: ${this.message}`;
  }
}

export default function handler(
  request: GatsbyFunctionRequest,
  response: GatsbyFunctionResponse
) {
  const { method = "" } = request;

  if (!ALLOWED_METHODS.includes(method)) {
    return response.status(405).end();
  }

  return response.send("Hello");
}

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

function parseAccessTokenString(ts: string): Either<string, Token> {
  const parameters = new URLSearchParams(ts);

  return TokenCodec.decode({
    id: parameters.get("oauth_token"),
    secret: parameters.get("oauth_token_secret"),
  });
}
