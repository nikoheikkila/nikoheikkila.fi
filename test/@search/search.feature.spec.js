// Generated from: feature/@search/search.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Post search', () => {

  test.describe('Searching for a known term lists matching posts', () => {

    test('Example #1', { tag: ['@search'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a desktop', null, { basePage }); 
      await And('the visitor is on the home page', null, { basePage }); 
      await When('the visitor searches for "software"', null, { basePage }); 
      await Then('the visitor sees the search results', null, { basePage }); 
    });

    test('Example #2', { tag: ['@search'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a phone', null, { basePage }); 
      await And('the visitor is on the home page', null, { basePage }); 
      await When('the visitor searches for "software"', null, { basePage }); 
      await Then('the visitor sees the search results', null, { basePage }); 
    });

  });

  test('Searching for an unknown term reports no results', { tag: ['@search'] }, async ({ Given, When, Then, basePage }) => { 
    await Given('the visitor is on the home page', null, { basePage }); 
    await When('the visitor searches for "xyznonexistent123"', null, { basePage }); 
    await Then('the visitor sees a no results message', null, { basePage }); 
  });

  test.describe('Opening a search result', () => {

    test('Example #1', { tag: ['@search'] }, async ({ Given, When, Then, And, postPage }) => { 
      await Given('the visitor is browsing on a desktop', null, { postPage }); 
      await And('the visitor has searched for "software"', null, { postPage }); 
      await When('the visitor follows the first search result link', null, { postPage }); 
      await Then('the visitor is on a post page', null, { postPage }); 
      await And('the search results are hidden', null, { postPage }); 
    });

    test('Example #2', { tag: ['@search'] }, async ({ Given, When, Then, And, postPage }) => { 
      await Given('the visitor is browsing on a phone', null, { postPage }); 
      await And('the visitor has searched for "software"', null, { postPage }); 
      await When('the visitor follows the first search result link', null, { postPage }); 
      await Then('the visitor is on a post page', null, { postPage }); 
      await And('the search results are hidden', null, { postPage }); 
    });

  });

  test('Opening a search result with the keyboard', { tag: ['@search'] }, async ({ Given, When, Then, And, postPage }) => { 
    await Given('the visitor has searched for "software"', null, { postPage }); 
    await And('the first search result is focused', null, { postPage }); 
    await When('the visitor presses "Enter"', null, { postPage }); 
    await Then('the visitor is on a post page', null, { postPage }); 
  });

  test.describe('Dismissing the search results', () => {

    test('Example #1', { tag: ['@search'] }, async ({ Given, When, Then, basePage }) => { 
      await Given('the visitor has searched for "software"', null, { basePage }); 
      await When('the visitor dismisses the search results by pressing Escape', null, { basePage }); 
      await Then('the search results are hidden', null, { basePage }); 
    });

    test('Example #2', { tag: ['@search'] }, async ({ Given, When, Then, basePage }) => { 
      await Given('the visitor has searched for "software"', null, { basePage }); 
      await When('the visitor dismisses the search results by clicking outside focus', null, { basePage }); 
      await Then('the search results are hidden', null, { basePage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@search/search.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":12,"tags":["@search"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a desktop","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"And the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When the visitor searches for \"software\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":25,"value":"\"software\"","children":[{"start":26,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the search results","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":13,"tags":["@search"],"steps":[{"pwStepLine":16,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a phone","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"And the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When the visitor searches for \"software\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":25,"value":"\"software\"","children":[{"start":26,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the search results","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":15,"tags":["@search"],"steps":[{"pwStepLine":25,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the visitor searches for \"xyznonexistent123\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":25,"value":"\"xyznonexistent123\"","children":[{"start":26,"value":"xyznonexistent123","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees a no results message","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":29,"tags":["@search"],"steps":[{"pwStepLine":33,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a desktop","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And the visitor has searched for \"software\"","pomFixtureName":"postPage","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the visitor follows the first search result link","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on a post page","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the search results are hidden","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":30,"tags":["@search"],"steps":[{"pwStepLine":41,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a phone","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And the visitor has searched for \"software\"","pomFixtureName":"postPage","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":43,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the visitor follows the first search result link","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on a post page","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the search results are hidden","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":32,"tags":["@search"],"steps":[{"pwStepLine":51,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given the visitor has searched for \"software\"","pomFixtureName":"postPage","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"And the first search result is focused","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When the visitor presses \"Enter\"","pomFixtureName":"postPage","stepMatchArguments":[{"group":{"start":20,"value":"\"Enter\"","children":[{"start":21,"value":"Enter","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on a post page","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":45,"tags":["@search"],"steps":[{"pwStepLine":60,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the visitor has searched for \"software\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the visitor dismisses the search results by pressing Escape","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the search results are hidden","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":46,"tags":["@search"],"steps":[{"pwStepLine":66,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the visitor has searched for \"software\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":67,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the visitor dismisses the search results by clicking outside focus","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the search results are hidden","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end