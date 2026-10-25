// Generated from: feature/@listing/post-listing.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Post listing', () => {

  test.describe('Home page lists the latest posts', () => {

    test('Example #1', { tag: ['@listing'] }, async ({ Given, When, Then, homePage }) => { 
      await Given('the visitor is browsing on a desktop', null, { homePage }); 
      await When('the visitor opens the home page', null, { homePage }); 
      await Then('the visitor sees 30 posts', null, { homePage }); 
    });

    test('Example #2', { tag: ['@listing'] }, async ({ Given, When, Then, homePage }) => { 
      await Given('the visitor is browsing on a phone', null, { homePage }); 
      await When('the visitor opens the home page', null, { homePage }); 
      await Then('the visitor sees 30 posts', null, { homePage }); 
    });

  });

  test.describe('Moving to the next index page', () => {

    test('Example #1', { tag: ['@listing'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a desktop', null, { basePage }); 
      await And('the visitor is on the home page', null, { basePage }); 
      await When('the visitor follows the link to the next index page', null, { basePage }); 
      await Then('the visitor is at "/2/"', null, { basePage }); 
    });

    test('Example #2', { tag: ['@listing'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a phone', null, { basePage }); 
      await And('the visitor is on the home page', null, { basePage }); 
      await When('the visitor follows the link to the next index page', null, { basePage }); 
      await Then('the visitor is at "/2/"', null, { basePage }); 
    });

  });

  test.describe('Returning to the previous index page', () => {

    test('Example #1', { tag: ['@listing'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a desktop', null, { basePage }); 
      await And('the visitor is on the second index page', null, { basePage }); 
      await When('the visitor follows the link to the previous index page', null, { basePage }); 
      await Then('the visitor is at "/"', null, { basePage }); 
    });

    test('Example #2', { tag: ['@listing'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a phone', null, { basePage }); 
      await And('the visitor is on the second index page', null, { basePage }); 
      await When('the visitor follows the link to the previous index page', null, { basePage }); 
      await Then('the visitor is at "/"', null, { basePage }); 
    });

  });

  test('First index page has no previous page', { tag: ['@listing'] }, async ({ When, Then, basePage }) => { 
    await When('the visitor opens the home page', null, { basePage }); 
    await Then('the visitor sees no link to the previous index page', null, { basePage }); 
  });

  test('Last index page has no next page', { tag: ['@listing'] }, async ({ When, Then, basePage }) => { 
    await When('the visitor opens the last index page', null, { basePage }); 
    await Then('the visitor sees no link to the next index page', null, { basePage }); 
  });

  test('Last index page links back to the previous page', { tag: ['@listing'] }, async ({ Given, When, Then, basePage }) => { 
    await Given('the visitor is on the last index page', null, { basePage }); 
    await When('the visitor follows the link to the previous index page', null, { basePage }); 
    await Then('the visitor sees a link to the next index page', null, { basePage }); 
  });

  test('Second index page links to its neighbours', { tag: ['@listing'] }, async ({ When, Then, And, basePage }) => { 
    await When('the visitor opens the second index page', null, { basePage }); 
    await Then('the visitor sees a link to the previous index page', null, { basePage }); 
    await And('the visitor sees a link to the next index page', null, { basePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@listing/post-listing.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":11,"tags":["@listing"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a desktop","pomFixtureName":"homePage","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor opens the home page","pomFixtureName":"homePage","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees 30 posts","pomFixtureName":"homePage","stepMatchArguments":[{"group":{"start":17,"value":"30"},"parameterTypeName":"int"}]}]},
  {"pwTestLine":14,"pickleLine":12,"tags":["@listing"],"steps":[{"pwStepLine":15,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a phone","pomFixtureName":"homePage","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor opens the home page","pomFixtureName":"homePage","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees 30 posts","pomFixtureName":"homePage","stepMatchArguments":[{"group":{"start":17,"value":"30"},"parameterTypeName":"int"}]}]},
  {"pwTestLine":24,"pickleLine":22,"tags":["@listing"],"steps":[{"pwStepLine":25,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a desktop","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the visitor follows the link to the next index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/2/\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":18,"value":"\"/2/\"","children":[{"start":19,"value":"/2/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":31,"pickleLine":23,"tags":["@listing"],"steps":[{"pwStepLine":32,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a phone","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the visitor follows the link to the next index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/2/\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":18,"value":"\"/2/\"","children":[{"start":19,"value":"/2/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":33,"tags":["@listing"],"steps":[{"pwStepLine":43,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a desktop","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And the visitor is on the second index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the visitor follows the link to the previous index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":18,"value":"\"/\"","children":[{"start":19,"value":"/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":49,"pickleLine":34,"tags":["@listing"],"steps":[{"pwStepLine":50,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a phone","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And the visitor is on the second index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the visitor follows the link to the previous index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":18,"value":"\"/\"","children":[{"start":19,"value":"/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":58,"pickleLine":36,"tags":["@listing"],"steps":[{"pwStepLine":59,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When the visitor opens the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees no link to the previous index page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":63,"pickleLine":40,"tags":["@listing"],"steps":[{"pwStepLine":64,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When the visitor opens the last index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees no link to the next index page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":68,"pickleLine":44,"tags":["@listing"],"steps":[{"pwStepLine":69,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"Given the visitor is on the last index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When the visitor follows the link to the previous index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees a link to the next index page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":74,"pickleLine":49,"tags":["@listing"],"steps":[{"pwStepLine":75,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When the visitor opens the second index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees a link to the previous index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And the visitor sees a link to the next index page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end