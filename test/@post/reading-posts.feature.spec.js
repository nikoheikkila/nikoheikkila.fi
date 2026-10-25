// Generated from: feature/@post/reading-posts.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Reading posts', () => {

  test('Home page allows navigating to a post', { tag: ['@post'] }, async ({ Given, When, Then, postPage }) => { 
    await Given('the visitor is on the home page', null, { postPage }); 
    await When('the visitor opens the latest post', null, { postPage }); 
    await Then('the visitor sees the post title as the main heading', null, { postPage }); 
  });

  test('Subscribing to the RSS feed from a post', { tag: ['@post'] }, async ({ Given, When, Then, basePage }) => { 
    await Given('the visitor is on the latest post', null, { basePage }); 
    await When('the visitor follows the RSS feed link', null, { basePage }); 
    await Then('the visitor arrives at the linked page', null, { basePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@post/reading-posts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@post"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is on the home page","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor opens the latest post","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the post title as the main heading","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":9,"tags":["@post"],"steps":[{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the visitor is on the latest post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the visitor follows the RSS feed link","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the visitor arrives at the linked page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end