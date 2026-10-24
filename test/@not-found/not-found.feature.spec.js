// Generated from: feature/@not-found/not-found.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Page not found', () => {

  test('Missing page shows the 404 page', { tag: ['@not-found'] }, async ({ When, Then, And, page, visit }) => { 
    await When('the visitor lands on a "missing page"', null, { page, visit }); 
    await Then('the response status is 404', null, { visit }); 
    await And('the page title is "Page Not Found"', null, { page }); 
    await And('the visitor sees a heading "You have erred"', null, { page }); 
    await And('the visitor sees a text "ERR_CONTENT_NOT_FOUND"', null, { page }); 
  });

  test('Returning home from the 404 page', { tag: ['@not-found'] }, async ({ Given, When, Then, page, visit }) => { 
    await Given('the visitor is on a "missing page"', null, { page, visit }); 
    await When('the visitor follows the "Home" link', null, { page }); 
    await Then('the visitor is on the "home page"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@not-found/not-found.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@not-found"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor lands on a \"missing page\"","stepMatchArguments":[{"group":{"start":23,"value":"\"missing page\"","children":[{"start":24,"value":"missing page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the response status is 404","stepMatchArguments":[{"group":{"start":23,"value":"404"},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the page title is \"Page Not Found\"","stepMatchArguments":[{"group":{"start":18,"value":"\"Page Not Found\"","children":[{"start":19,"value":"Page Not Found","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And the visitor sees a heading \"You have erred\"","stepMatchArguments":[{"group":{"start":27,"value":"\"You have erred\"","children":[{"start":28,"value":"You have erred","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And the visitor sees a text \"ERR_CONTENT_NOT_FOUND\"","stepMatchArguments":[{"group":{"start":24,"value":"\"ERR_CONTENT_NOT_FOUND\"","children":[{"start":25,"value":"ERR_CONTENT_NOT_FOUND","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":11,"tags":["@not-found"],"steps":[{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given the visitor is on a \"missing page\"","stepMatchArguments":[{"group":{"start":20,"value":"\"missing page\"","children":[{"start":21,"value":"missing page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When the visitor follows the \"Home\" link","stepMatchArguments":[{"group":{"start":24,"value":"\"Home\"","children":[{"start":25,"value":"Home","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end