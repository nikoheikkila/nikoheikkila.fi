// Generated from: feature/@post/post-navigation.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Moving between posts', () => {

  test('Post with neighbours links to the older and the newer post', { tag: ['@post'] }, async ({ When, Then, And, basePage }) => { 
    await When('the visitor opens the middle post', null, { basePage }); 
    await Then('the visitor sees a link to the older post', null, { basePage }); 
    await And('the visitor sees a link to the newer post', null, { basePage }); 
  });

  test.describe('Following a link to a neighbouring post', () => {

    test('Example #1', { tag: ['@post'] }, async ({ Given, When, Then, basePage }) => { 
      await Given('the visitor is on the middle post', null, { basePage }); 
      await When('the visitor follows the link to the older post', null, { basePage }); 
      await Then('the visitor arrives at the linked page', null, { basePage }); 
    });

    test('Example #2', { tag: ['@post'] }, async ({ Given, When, Then, basePage }) => { 
      await Given('the visitor is on the middle post', null, { basePage }); 
      await When('the visitor follows the link to the newer post', null, { basePage }); 
      await Then('the visitor arrives at the linked page', null, { basePage }); 
    });

  });

  test('Oldest post links only to a newer post', { tag: ['@post'] }, async ({ When, Then, And, basePage }) => { 
    await When('the visitor opens the oldest post', null, { basePage }); 
    await Then('the visitor sees no link to the older post', null, { basePage }); 
    await And('the visitor sees a link to the newer post', null, { basePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@post/post-navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@post"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the middle post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees a link to the older post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the visitor sees a link to the newer post","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":14,"pickleLine":16,"tags":["@post"],"steps":[{"pwStepLine":15,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the visitor is on the middle post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the visitor follows the link to the older post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the visitor arrives at the linked page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":17,"tags":["@post"],"steps":[{"pwStepLine":21,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the visitor is on the middle post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the visitor follows the link to the newer post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the visitor arrives at the linked page","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":19,"tags":["@post"],"steps":[{"pwStepLine":29,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the visitor opens the oldest post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees no link to the older post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the visitor sees a link to the newer post","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end