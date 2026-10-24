// Generated from: feature/@external-links/external-links.feature
import { test } from "../../feature/fixtures.ts";

test.describe('External links', () => {

  test('Visitor can edit pages', { tag: ['@external-links'] }, async ({ Given, When, Then, And, page, tabs }) => { 
    await Given('the visitor is on the "latest post"', null, { page }); 
    await When('the visitor follows the "Edit Page" link', null, { page, tabs }); 
    await Then('"GitHub" opens in a new tab', null, { tabs }); 
    await And('the visitor sees the "GitHub text editor"', null, { tabs }); 
    await And('the "latest post" is open in the original tab', null, { page }); 
  });

  test('Visitors can view page history', { tag: ['@external-links'] }, async ({ Given, When, Then, And, page, tabs }) => { 
    await Given('the visitor is on the "latest post"', null, { page }); 
    await When('the visitor follows the "View History" link', null, { page, tabs }); 
    await Then('"GitHub" opens in a new tab', null, { tabs }); 
    await And('the visitor sees the "GitHub commits listing"', null, { tabs }); 
    await And('the "latest post" is open in the original tab', null, { page }); 
  });

  test('Skills menu item opens the CV site in a new tab', { tag: ['@external-links'] }, async ({ Given, When, Then, page, tabs }) => { 
    await Given('the visitor has the sidebar menu open', null, { page }); 
    await When('the visitor follows the "Skills" link', null, { page, tabs }); 
    await Then('"LinkedIn" opens in a new tab', null, { tabs }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@external-links/external-links.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@external-links"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"Edit Page\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"Edit Page\"","children":[{"start":25,"value":"Edit Page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then \"GitHub\" opens in a new tab","stepMatchArguments":[{"group":{"start":0,"value":"\"GitHub\"","children":[{"start":1,"value":"GitHub","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And the visitor sees the \"GitHub text editor\"","stepMatchArguments":[{"group":{"start":21,"value":"\"GitHub text editor\"","children":[{"start":22,"value":"GitHub text editor","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And the \"latest post\" is open in the original tab","stepMatchArguments":[{"group":{"start":4,"value":"\"latest post\"","children":[{"start":5,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":11,"tags":["@external-links"],"steps":[{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"View History\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"View History\"","children":[{"start":25,"value":"View History","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then \"GitHub\" opens in a new tab","stepMatchArguments":[{"group":{"start":0,"value":"\"GitHub\"","children":[{"start":1,"value":"GitHub","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And the visitor sees the \"GitHub commits listing\"","stepMatchArguments":[{"group":{"start":21,"value":"\"GitHub commits listing\"","children":[{"start":22,"value":"GitHub commits listing","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And the \"latest post\" is open in the original tab","stepMatchArguments":[{"group":{"start":4,"value":"\"latest post\"","children":[{"start":5,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":18,"tags":["@external-links"],"steps":[{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the visitor has the sidebar menu open","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"Skills\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"Skills\"","children":[{"start":25,"value":"Skills","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then \"LinkedIn\" opens in a new tab","stepMatchArguments":[{"group":{"start":0,"value":"\"LinkedIn\"","children":[{"start":1,"value":"LinkedIn","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end