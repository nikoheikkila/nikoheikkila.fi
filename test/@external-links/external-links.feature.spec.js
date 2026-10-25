// Generated from: feature/@external-links/external-links.feature
import { test } from "../../feature/fixtures.ts";

test.describe('External links', () => {

  test('Visitor can edit pages', { tag: ['@external-links'] }, async ({ Given, When, Then, And, postPage }) => { 
    await Given('the visitor is on the latest post', null, { postPage }); 
    await When('the visitor follows the external "Edit Page" link', null, { postPage }); 
    await Then('the GitHub text editor opens in a new tab', null, { postPage }); 
    await And('the latest post is open in the original tab', null, { postPage }); 
  });

  test('Visitors can view page history', { tag: ['@external-links'] }, async ({ Given, When, Then, And, postPage }) => { 
    await Given('the visitor is on the latest post', null, { postPage }); 
    await When('the visitor follows the external "View History" link', null, { postPage }); 
    await Then('the GitHub commits listing opens in a new tab', null, { postPage }); 
    await And('the latest post is open in the original tab', null, { postPage }); 
  });

  test('Skills menu item opens the CV site in a new tab', { tag: ['@external-links'] }, async ({ Given, When, Then, basePage }) => { 
    await Given('the visitor has the sidebar menu open', null, { basePage }); 
    await When('the visitor follows the external "Skills" link', null, { basePage }); 
    await Then('LinkedIn opens in a new tab', null, { basePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@external-links/external-links.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@external-links"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is on the latest post","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor follows the external \"Edit Page\" link","pomFixtureName":"postPage","stepMatchArguments":[{"group":{"start":33,"value":"\"Edit Page\"","children":[{"start":34,"value":"Edit Page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the GitHub text editor opens in a new tab","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And the latest post is open in the original tab","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":10,"tags":["@external-links"],"steps":[{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the visitor is on the latest post","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the visitor follows the external \"View History\" link","pomFixtureName":"postPage","stepMatchArguments":[{"group":{"start":33,"value":"\"View History\"","children":[{"start":34,"value":"View History","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the GitHub commits listing opens in a new tab","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the latest post is open in the original tab","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":16,"tags":["@external-links"],"steps":[{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the visitor has the sidebar menu open","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the visitor follows the external \"Skills\" link","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":33,"value":"\"Skills\"","children":[{"start":34,"value":"Skills","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then LinkedIn opens in a new tab","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end