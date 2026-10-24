// Generated from: feature/@search/search.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Post search', () => {

  test.describe('Searching for a known term lists matching posts', () => {

    test('Example #1', { tag: ['@search'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('the visitor is browsing on a "desktop"', null, { page }); 
      await And('the visitor is on the "home page"', null, { page }); 
      await When('the visitor searches for "software"', null, { page }); 
      await Then('the visitor sees the search results', null, { page }); 
    });

    test('Example #2', { tag: ['@search'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('the visitor is browsing on a "phone"', null, { page }); 
      await And('the visitor is on the "home page"', null, { page }); 
      await When('the visitor searches for "software"', null, { page }); 
      await Then('the visitor sees the search results', null, { page }); 
    });

  });

  test('Searching for an unknown term reports no results', { tag: ['@search'] }, async ({ Given, When, Then, page }) => { 
    await Given('the visitor is on the "home page"', null, { page }); 
    await When('the visitor searches for "xyznonexistent123"', null, { page }); 
    await Then('the visitor sees a no results message', null, { page }); 
  });

  test.describe('Opening a search result', () => {

    test('Example #1', { tag: ['@search'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('the visitor is browsing on a "desktop"', null, { page }); 
      await And('the visitor has searched for "software"', null, { page }); 
      await When('the visitor follows the first search result link', null, { page }); 
      await Then('the visitor is on the "post page"', null, { page }); 
      await And('the search results are hidden', null, { page }); 
    });

    test('Example #2', { tag: ['@search'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('the visitor is browsing on a "phone"', null, { page }); 
      await And('the visitor has searched for "software"', null, { page }); 
      await When('the visitor follows the first search result link', null, { page }); 
      await Then('the visitor is on the "post page"', null, { page }); 
      await And('the search results are hidden', null, { page }); 
    });

  });

  test('Opening a search result with the keyboard', { tag: ['@search'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('the visitor has searched for "software"', null, { page }); 
    await And('the first search result is focused', null, { page }); 
    await When('the visitor presses "Enter"', null, { page }); 
    await Then('the visitor is on the "post page"', null, { page }); 
  });

  test.describe('Dismissing the search results', () => {

    test('Example #1', { tag: ['@search'] }, async ({ Given, When, Then, page }) => { 
      await Given('the visitor has searched for "software"', null, { page }); 
      await When('the visitor dismisses the search results by "pressing Escape"', null, { page }); 
      await Then('the search results are hidden', null, { page }); 
    });

    test('Example #2', { tag: ['@search'] }, async ({ Given, When, Then, page }) => { 
      await Given('the visitor has searched for "software"', null, { page }); 
      await When('the visitor dismisses the search results by "clicking outside focus"', null, { page }); 
      await Then('the search results are hidden', null, { page }); 
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
  {"pwTestLine":8,"pickleLine":12,"tags":["@search"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"desktop\"","stepMatchArguments":[{"group":{"start":29,"value":"\"desktop\"","children":[{"start":30,"value":"desktop","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"And the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When the visitor searches for \"software\"","stepMatchArguments":[{"group":{"start":25,"value":"\"software\"","children":[{"start":26,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the search results","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":13,"tags":["@search"],"steps":[{"pwStepLine":16,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"phone\"","stepMatchArguments":[{"group":{"start":29,"value":"\"phone\"","children":[{"start":30,"value":"phone","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"And the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When the visitor searches for \"software\"","stepMatchArguments":[{"group":{"start":25,"value":"\"software\"","children":[{"start":26,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the search results","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":15,"tags":["@search"],"steps":[{"pwStepLine":25,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the visitor searches for \"xyznonexistent123\"","stepMatchArguments":[{"group":{"start":25,"value":"\"xyznonexistent123\"","children":[{"start":26,"value":"xyznonexistent123","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees a no results message","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":29,"tags":["@search"],"steps":[{"pwStepLine":33,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"desktop\"","stepMatchArguments":[{"group":{"start":29,"value":"\"desktop\"","children":[{"start":30,"value":"desktop","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And the visitor has searched for \"software\"","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the visitor follows the first search result link","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on the \"post page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"post page\"","children":[{"start":23,"value":"post page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the search results are hidden","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":30,"tags":["@search"],"steps":[{"pwStepLine":41,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"phone\"","stepMatchArguments":[{"group":{"start":29,"value":"\"phone\"","children":[{"start":30,"value":"phone","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And the visitor has searched for \"software\"","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":43,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the visitor follows the first search result link","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on the \"post page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"post page\"","children":[{"start":23,"value":"post page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the search results are hidden","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":32,"tags":["@search"],"steps":[{"pwStepLine":51,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given the visitor has searched for \"software\"","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"And the first search result is focused","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When the visitor presses \"Enter\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Enter\"","children":[{"start":21,"value":"Enter","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on the \"post page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"post page\"","children":[{"start":23,"value":"post page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":59,"pickleLine":45,"tags":["@search"],"steps":[{"pwStepLine":60,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the visitor has searched for \"software\"","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the visitor dismisses the search results by \"pressing Escape\"","stepMatchArguments":[{"group":{"start":44,"value":"\"pressing Escape\"","children":[{"start":45,"value":"pressing Escape","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":62,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the search results are hidden","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":46,"tags":["@search"],"steps":[{"pwStepLine":66,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the visitor has searched for \"software\"","stepMatchArguments":[{"group":{"start":29,"value":"\"software\"","children":[{"start":30,"value":"software","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":67,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the visitor dismisses the search results by \"clicking outside focus\"","stepMatchArguments":[{"group":{"start":44,"value":"\"clicking outside focus\"","children":[{"start":45,"value":"clicking outside focus","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":68,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the search results are hidden","stepMatchArguments":[]}]},
]; // bdd-data-end