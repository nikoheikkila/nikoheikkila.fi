// Generated from: feature/@navigation/site-navigation.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Site navigation', () => {

  test.describe('Opening the sidebar menu', () => {

    test('Example #1', { tag: ['@navigation'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a desktop', null, { basePage }); 
      await And('the visitor is on the home page', null, { basePage }); 
      await When('the visitor opens the sidebar menu', null, { basePage }); 
      await Then('the visitor sees the sidebar menu', null, { basePage }); 
    });

    test('Example #2', { tag: ['@navigation'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a phone', null, { basePage }); 
      await And('the visitor is on the home page', null, { basePage }); 
      await When('the visitor opens the sidebar menu', null, { basePage }); 
      await Then('the visitor sees the sidebar menu', null, { basePage }); 
    });

  });

  test.describe('Closing the sidebar menu by clicking outside it', () => {

    test('Example #1', { tag: ['@navigation'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a desktop', null, { basePage }); 
      await And('the visitor has the sidebar menu open', null, { basePage }); 
      await When('the visitor clicks outside the sidebar menu', null, { basePage }); 
      await Then('the sidebar menu is closed', null, { basePage }); 
    });

    test('Example #2', { tag: ['@navigation'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a phone', null, { basePage }); 
      await And('the visitor has the sidebar menu open', null, { basePage }); 
      await When('the visitor clicks outside the sidebar menu', null, { basePage }); 
      await Then('the sidebar menu is closed', null, { basePage }); 
    });

  });

  test('Footer links to the author\'s social profiles', { tag: ['@navigation'] }, async ({ Given, When, Then, basePage }) => { 
    await Given('the visitor is on the home page', null, { basePage }); 
    await When('the visitor scrolls to the footer', null, { basePage }); 
    await Then('the visitor sees the social profile links', null, { basePage }); 
  });

  test.describe('Subscribing to the RSS feed from the footer', () => {

    test('Example #1', { tag: ['@navigation'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a desktop', null, { basePage }); 
      await And('the visitor is on the home page', null, { basePage }); 
      await When('the visitor follows the RSS link in the footer', null, { basePage }); 
      await Then('the visitor arrives at the linked page', null, { basePage }); 
    });

    test('Example #2', { tag: ['@navigation'] }, async ({ Given, When, Then, And, basePage }) => { 
      await Given('the visitor is browsing on a phone', null, { basePage }); 
      await And('the visitor is on the home page', null, { basePage }); 
      await When('the visitor follows the RSS link in the footer', null, { basePage }); 
      await Then('the visitor arrives at the linked page', null, { basePage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@navigation/site-navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":12,"tags":["@navigation"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a desktop","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"And the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When the visitor opens the sidebar menu","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the sidebar menu","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":13,"tags":["@navigation"],"steps":[{"pwStepLine":16,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a phone","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"And the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When the visitor opens the sidebar menu","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the sidebar menu","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":23,"tags":["@navigation"],"steps":[{"pwStepLine":27,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a desktop","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"And the visitor has the sidebar menu open","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the visitor clicks outside the sidebar menu","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the sidebar menu is closed","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":24,"tags":["@navigation"],"steps":[{"pwStepLine":34,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a phone","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"And the visitor has the sidebar menu open","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the visitor clicks outside the sidebar menu","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the sidebar menu is closed","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":42,"pickleLine":26,"tags":["@navigation"],"steps":[{"pwStepLine":43,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the visitor scrolls to the footer","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the social profile links","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":39,"tags":["@navigation"],"steps":[{"pwStepLine":51,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a desktop","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the visitor follows the RSS link in the footer","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the visitor arrives at the linked page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":57,"pickleLine":40,"tags":["@navigation"],"steps":[{"pwStepLine":58,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Given the visitor is browsing on a phone","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the visitor follows the RSS link in the footer","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the visitor arrives at the linked page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end