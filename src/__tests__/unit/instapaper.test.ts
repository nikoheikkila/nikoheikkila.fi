import test from "ava";
import nock from "nock";
import * as Instapaper from "../../api/instapaper";

let scope: nock.Scope;

test.beforeEach(() => {
  scope = nock("https://instapaper.com");
});

test.afterEach(() => {
  nock.cleanAll();
});

test("parses a valid authorization token", async (t) => {
  const username = "testuser";
  const password = "testpassword";

  scope
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

  scope
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

  scope
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
