// Generated from: feature/@post/reading-posts.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Reading posts', () => {

  test('Home page allows navigating to a post', { tag: ['@post'] }, async ({ Given, When, Then, page }) => { 
    await Given('the visitor is on the "home page"', null, { page }); 
    await When('the visitor opens the "latest post"', null, { page }); 
    await Then('the visitor sees the "post title" as main heading', null, { page }); 
  });

  test('Posts can be subscribed to via RSS', { tag: ['@post'] }, async ({ Given, When, Then, page }) => { 
    await Given('the visitor is on the "home page"', null, { page }); 
    await When('the visitor opens the "latest post"', null, { page }); 
    await Then('the visitor sees the "RSS feed" link', null, { page }); 
  });

  test('Subscribing to the RSS feed from a post', { tag: ['@post'] }, async ({ Given, When, Then, destination, page }) => { 
    await Given('the visitor is on the "latest post"', null, { page }); 
    await When('the visitor follows the "RSS feed" link', null, { destination, page }); 
    await Then('the visitor is on the "RSS feed"', null, { destination, page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@post/reading-posts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@post"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the \"post title\" as main heading","stepMatchArguments":[{"group":{"start":21,"value":"\"post title\"","children":[{"start":22,"value":"post title","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":12,"pickleLine":9,"tags":["@post"],"steps":[{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the \"RSS feed\" link","stepMatchArguments":[{"group":{"start":21,"value":"\"RSS feed\"","children":[{"start":22,"value":"RSS feed","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":18,"pickleLine":14,"tags":["@post"],"steps":[{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"RSS feed\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"RSS feed\"","children":[{"start":25,"value":"RSS feed","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on the \"RSS feed\"","stepMatchArguments":[{"group":{"start":22,"value":"\"RSS feed\"","children":[{"start":23,"value":"RSS feed","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end