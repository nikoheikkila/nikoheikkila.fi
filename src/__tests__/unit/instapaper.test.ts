import test from "ava";
import nock from "nock";
import * as Instapaper from "../../api/instapaper";

const TOKEN = "sometoken";

test.beforeEach(() => {
  nock.cleanAll();
});

test("parses a valid authorization token", async (t) => {
  const username = "testuser";
  const password = "testpassword";

  nock("https://instapaper.com")
    .post("/api/1/oauth/access_token", {
      x_auth_username: username,
      x_auth_password: password,
      x_auth_mode: "client_auth",
    })
    .reply(200, "oauth_token=aabbccdd&oauth_token_secret=efgh1234");

  const response = await Instapaper.getAuthorizationToken(username, password);
  t.true(response.isRight());

  response.caseOf({
    Left: (_) => t.fail(),
    Right: (token) => {
      t.is(token.id, "aabbccdd");
      t.is(token.secret, "efgh1234");
    },
  });
});

test("handles API errors gracefully", async (t) => {
  const username = "wronguser";
  const password = "wrongpassword";

  nock("https://instapaper.com")
    .post("/api/1/oauth/access_token", {
      x_auth_username: username,
      x_auth_password: password,
      x_auth_mode: "client_auth",
    })
    .reply(403, "Forbidden");

  const response = await Instapaper.getAuthorizationToken(username, password);
  t.true(response.isLeft());

  response.caseOf({
    Left: (error) => t.regex(error.report(), /Forbidden/),
    Right: (_) => t.fail(),
  });
});

test("handles an invalid authorization token", async (t) => {
  const username = "testuser";
  const password = "testpassword";

  nock("https://instapaper.com")
    .post("/api/1/oauth/access_token", {
      x_auth_username: username,
      x_auth_password: password,
      x_auth_mode: "client_auth",
    })
    .reply(200, "key=value&key2=value2");

  const response = await Instapaper.getAuthorizationToken(username, password);
  t.true(response.isLeft());

  response.caseOf({
    Left: (error) =>
      t.regex(error.report(), /Expected a string, but received null/),
    Right: (_) => t.fail(),
  });
});

test("returns a list of starred bookmarks", async (t) => {
  const limit = 2;

  nock("https://instapaper.com", {
    reqheaders: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .post("/api/1/bookmarks/list", {
      limit,
      folder_id: "starred",
    })
    .reply(200, {
      user: {
        type: "user",
        user_id: 123456,
        username: "testuser",
      },
      bookmarks: [
        {
          type: "bookmark",
          bookmark_id: 1,
          url: "https://example.org/1",
          title: "Link 1",
          description: "Description",
        },
        {
          type: "bookmark",
          bookmark_id: 2,
          url: "https://example.org/2",
          title: "Link 2",
          description: "Description",
        },
      ],
      highlights: [],
      delete_ids: [],
    });

  const response = await Instapaper.getBookmarks({ token: TOKEN, limit });

  t.true(response.isRight());

  response.caseOf({
    Left: (_) => t.fail(),
    Right: (bookmarks) => {
      t.is(bookmarks.length, 2);
      t.deepEqual(bookmarks, [
        { id: 1, title: "Link 1", url: "https://example.org/1" },
        { id: 2, title: "Link 2", url: "https://example.org/2" },
      ]);
    },
  });
});
