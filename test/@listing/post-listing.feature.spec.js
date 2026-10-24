// Generated from: feature/@listing/post-listing.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Post listing', () => {

  test.describe('Home page lists the latest posts', () => {

    test('Example #1', { tag: ['@listing'] }, async ({ Given, When, Then, page }) => { 
      await Given('the visitor is browsing on a "desktop"', null, { page }); 
      await When('the visitor opens the "home page"', null, { page }); 
      await Then('the visitor sees 30 posts', null, { page }); 
    });

    test('Example #2', { tag: ['@listing'] }, async ({ Given, When, Then, page }) => { 
      await Given('the visitor is browsing on a "phone"', null, { page }); 
      await When('the visitor opens the "home page"', null, { page }); 
      await Then('the visitor sees 30 posts', null, { page }); 
    });

  });

  test.describe('Moving to the next index page', () => {

    test('Example #1', { tag: ['@listing'] }, async ({ Given, When, Then, And, destination, page }) => { 
      await Given('the visitor is browsing on a "desktop"', null, { page }); 
      await And('the visitor is on the "home page"', null, { page }); 
      await When('the visitor follows the "next index page" link', null, { destination, page }); 
      await Then('the visitor is at "/2/"', null, { page }); 
    });

    test('Example #2', { tag: ['@listing'] }, async ({ Given, When, Then, And, destination, page }) => { 
      await Given('the visitor is browsing on a "phone"', null, { page }); 
      await And('the visitor is on the "home page"', null, { page }); 
      await When('the visitor follows the "next index page" link', null, { destination, page }); 
      await Then('the visitor is at "/2/"', null, { page }); 
    });

  });

  test.describe('Returning to the previous index page', () => {

    test('Example #1', { tag: ['@listing'] }, async ({ Given, When, Then, And, destination, page }) => { 
      await Given('the visitor is browsing on a "desktop"', null, { page }); 
      await And('the visitor is on the "second index page"', null, { page }); 
      await When('the visitor follows the "previous index page" link', null, { destination, page }); 
      await Then('the visitor is at "/"', null, { page }); 
    });

    test('Example #2', { tag: ['@listing'] }, async ({ Given, When, Then, And, destination, page }) => { 
      await Given('the visitor is browsing on a "phone"', null, { page }); 
      await And('the visitor is on the "second index page"', null, { page }); 
      await When('the visitor follows the "previous index page" link', null, { destination, page }); 
      await Then('the visitor is at "/"', null, { page }); 
    });

  });

  test('First index page has no previous page', { tag: ['@listing'] }, async ({ When, Then, page }) => { 
    await When('the visitor opens the "home page"', null, { page }); 
    await Then('the visitor does not see the "previous index page" link', null, { page }); 
  });

  test('Last index page has no next page', { tag: ['@listing'] }, async ({ When, Then, page }) => { 
    await When('the visitor opens the "last index page"', null, { page }); 
    await Then('the visitor does not see the "next index page" link', null, { page }); 
  });

  test('Last index page links back to the previous page', { tag: ['@listing'] }, async ({ Given, When, Then, destination, page }) => { 
    await Given('the visitor is on the "last index page"', null, { page }); 
    await When('the visitor follows the "previous index page" link', null, { destination, page }); 
    await Then('the visitor sees the "next index page" link', null, { page }); 
  });

  test('Second index page links to its neighbours', { tag: ['@listing'] }, async ({ When, Then, And, page }) => { 
    await When('the visitor opens the "second index page"', null, { page }); 
    await Then('the visitor sees the "previous index page" link', null, { page }); 
    await And('the visitor sees the "next index page" link', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@listing/post-listing.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":11,"tags":["@listing"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"desktop\"","stepMatchArguments":[{"group":{"start":29,"value":"\"desktop\"","children":[{"start":30,"value":"desktop","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees 30 posts","stepMatchArguments":[{"group":{"start":17,"value":"30"},"parameterTypeName":"int"}]}]},
  {"pwTestLine":14,"pickleLine":12,"tags":["@listing"],"steps":[{"pwStepLine":15,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"phone\"","stepMatchArguments":[{"group":{"start":29,"value":"\"phone\"","children":[{"start":30,"value":"phone","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees 30 posts","stepMatchArguments":[{"group":{"start":17,"value":"30"},"parameterTypeName":"int"}]}]},
  {"pwTestLine":24,"pickleLine":22,"tags":["@listing"],"steps":[{"pwStepLine":25,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"desktop\"","stepMatchArguments":[{"group":{"start":29,"value":"\"desktop\"","children":[{"start":30,"value":"desktop","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"next index page\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"next index page\"","children":[{"start":25,"value":"next index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/2/\"","stepMatchArguments":[{"group":{"start":18,"value":"\"/2/\"","children":[{"start":19,"value":"/2/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":31,"pickleLine":23,"tags":["@listing"],"steps":[{"pwStepLine":32,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"phone\"","stepMatchArguments":[{"group":{"start":29,"value":"\"phone\"","children":[{"start":30,"value":"phone","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"next index page\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"next index page\"","children":[{"start":25,"value":"next index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/2/\"","stepMatchArguments":[{"group":{"start":18,"value":"\"/2/\"","children":[{"start":19,"value":"/2/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":33,"tags":["@listing"],"steps":[{"pwStepLine":43,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"desktop\"","stepMatchArguments":[{"group":{"start":29,"value":"\"desktop\"","children":[{"start":30,"value":"desktop","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And the visitor is on the \"second index page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"second index page\"","children":[{"start":23,"value":"second index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"previous index page\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"previous index page\"","children":[{"start":25,"value":"previous index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/\"","stepMatchArguments":[{"group":{"start":18,"value":"\"/\"","children":[{"start":19,"value":"/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":49,"pickleLine":34,"tags":["@listing"],"steps":[{"pwStepLine":50,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a \"phone\"","stepMatchArguments":[{"group":{"start":29,"value":"\"phone\"","children":[{"start":30,"value":"phone","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":51,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And the visitor is on the \"second index page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"second index page\"","children":[{"start":23,"value":"second index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"previous index page\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"previous index page\"","children":[{"start":25,"value":"previous index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/\"","stepMatchArguments":[{"group":{"start":18,"value":"\"/\"","children":[{"start":19,"value":"/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":58,"pickleLine":36,"tags":["@listing"],"steps":[{"pwStepLine":59,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then the visitor does not see the \"previous index page\" link","stepMatchArguments":[{"group":{"start":29,"value":"\"previous index page\"","children":[{"start":30,"value":"previous index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":63,"pickleLine":40,"tags":["@listing"],"steps":[{"pwStepLine":64,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"last index page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"last index page\"","children":[{"start":23,"value":"last index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then the visitor does not see the \"next index page\" link","stepMatchArguments":[{"group":{"start":29,"value":"\"next index page\"","children":[{"start":30,"value":"next index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":68,"pickleLine":44,"tags":["@listing"],"steps":[{"pwStepLine":69,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"last index page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"last index page\"","children":[{"start":23,"value":"last index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"previous index page\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"previous index page\"","children":[{"start":25,"value":"previous index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":71,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the \"next index page\" link","stepMatchArguments":[{"group":{"start":21,"value":"\"next index page\"","children":[{"start":22,"value":"next index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":74,"pickleLine":49,"tags":["@listing"],"steps":[{"pwStepLine":75,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"second index page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"second index page\"","children":[{"start":23,"value":"second index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":76,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the \"previous index page\" link","stepMatchArguments":[{"group":{"start":21,"value":"\"previous index page\"","children":[{"start":22,"value":"previous index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":77,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And the visitor sees the \"next index page\" link","stepMatchArguments":[{"group":{"start":21,"value":"\"next index page\"","children":[{"start":22,"value":"next index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end