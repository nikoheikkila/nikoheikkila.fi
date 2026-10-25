// Generated from: feature/@not-found/not-found.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Page not found', () => {

  test('Missing page shows the 404 page', { tag: ['@not-found'] }, async ({ When, Then, And, notFoundPage }) => { 
    await When('the visitor lands on "/this-page-does-not-exist/"', null, { notFoundPage }); 
    await Then('the response status is 404', null, { notFoundPage }); 
    await And('the page title is "Page Not Found"', null, { notFoundPage }); 
    await And('the visitor sees a heading "You have erred"', null, { notFoundPage }); 
    await And('the visitor sees a text "ERR_CONTENT_NOT_FOUND"', null, { notFoundPage }); 
  });

  test('Returning home from the 404 page', { tag: ['@not-found'] }, async ({ Given, When, Then, notFoundPage }) => { 
    await Given('the visitor is on "/this-page-does-not-exist/"', null, { notFoundPage }); 
    await When('the visitor follows the link to the home page', null, { notFoundPage }); 
    await Then('the visitor is at "/"', null, { notFoundPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@not-found/not-found.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@not-found"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor lands on \"/this-page-does-not-exist/\"","pomFixtureName":"notFoundPage","stepMatchArguments":[{"group":{"start":21,"value":"\"/this-page-does-not-exist/\"","children":[{"start":22,"value":"/this-page-does-not-exist/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the response status is 404","pomFixtureName":"notFoundPage","stepMatchArguments":[{"group":{"start":23,"value":"404"},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the page title is \"Page Not Found\"","pomFixtureName":"notFoundPage","stepMatchArguments":[{"group":{"start":18,"value":"\"Page Not Found\"","children":[{"start":19,"value":"Page Not Found","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And the visitor sees a heading \"You have erred\"","pomFixtureName":"notFoundPage","stepMatchArguments":[{"group":{"start":27,"value":"\"You have erred\"","children":[{"start":28,"value":"You have erred","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And the visitor sees a text \"ERR_CONTENT_NOT_FOUND\"","pomFixtureName":"notFoundPage","stepMatchArguments":[{"group":{"start":24,"value":"\"ERR_CONTENT_NOT_FOUND\"","children":[{"start":25,"value":"ERR_CONTENT_NOT_FOUND","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":11,"tags":["@not-found"],"steps":[{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given the visitor is on \"/this-page-does-not-exist/\"","pomFixtureName":"notFoundPage","stepMatchArguments":[{"group":{"start":18,"value":"\"/this-page-does-not-exist/\"","children":[{"start":19,"value":"/this-page-does-not-exist/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When the visitor follows the link to the home page","pomFixtureName":"notFoundPage","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the visitor is at \"/\"","pomFixtureName":"notFoundPage","stepMatchArguments":[{"group":{"start":18,"value":"\"/\"","children":[{"start":19,"value":"/","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end