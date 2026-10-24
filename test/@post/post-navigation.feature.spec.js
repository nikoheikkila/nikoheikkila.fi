// Generated from: feature/@post/post-navigation.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Moving between posts', () => {

  test('Post with neighbours links to the older and the newer post', { tag: ['@post'] }, async ({ When, Then, And, page }) => { 
    await When('the visitor opens the "middle post"', null, { page }); 
    await Then('the visitor sees the "older post link"', null, { page }); 
    await And('the visitor sees the "newer post link"', null, { page }); 
  });

  test.describe('Following a link to a neighbouring post', () => {

    test('Example #1', { tag: ['@post'] }, async ({ Given, When, Then, destination, page }) => { 
      await Given('the visitor is on the "middle post"', null, { page }); 
      await When('the visitor follows the "older post" link', null, { destination, page }); 
      await Then('the visitor is on the "older post"', null, { destination, page }); 
    });

    test('Example #2', { tag: ['@post'] }, async ({ Given, When, Then, destination, page }) => { 
      await Given('the visitor is on the "middle post"', null, { page }); 
      await When('the visitor follows the "newer post" link', null, { destination, page }); 
      await Then('the visitor is on the "newer post"', null, { destination, page }); 
    });

  });

  test('Oldest post links only to a newer post', { tag: ['@post'] }, async ({ When, Then, And, page }) => { 
    await When('the visitor opens the "oldest post"', null, { page }); 
    await Then('the visitor does not see the "older post link"', null, { page }); 
    await And('the visitor sees the "newer post link"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@post/post-navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@post"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"middle post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"middle post\"","children":[{"start":23,"value":"middle post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the \"older post link\"","stepMatchArguments":[{"group":{"start":21,"value":"\"older post link\"","children":[{"start":22,"value":"older post link","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the visitor sees the \"newer post link\"","stepMatchArguments":[{"group":{"start":21,"value":"\"newer post link\"","children":[{"start":22,"value":"newer post link","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":16,"tags":["@post"],"steps":[{"pwStepLine":15,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"middle post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"middle post\"","children":[{"start":23,"value":"middle post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"older post\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"older post\"","children":[{"start":25,"value":"older post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on the \"older post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"older post\"","children":[{"start":23,"value":"older post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":20,"pickleLine":17,"tags":["@post"],"steps":[{"pwStepLine":21,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"middle post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"middle post\"","children":[{"start":23,"value":"middle post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"newer post\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"newer post\"","children":[{"start":25,"value":"newer post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on the \"newer post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"newer post\"","children":[{"start":23,"value":"newer post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":28,"pickleLine":19,"tags":["@post"],"steps":[{"pwStepLine":29,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"oldest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"oldest post\"","children":[{"start":23,"value":"oldest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the visitor does not see the \"older post link\"","stepMatchArguments":[{"group":{"start":29,"value":"\"older post link\"","children":[{"start":30,"value":"older post link","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the visitor sees the \"newer post link\"","stepMatchArguments":[{"group":{"start":21,"value":"\"newer post link\"","children":[{"start":22,"value":"newer post link","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end