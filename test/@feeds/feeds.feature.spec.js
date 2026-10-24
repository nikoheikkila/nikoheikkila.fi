// Generated from: feature/@feeds/feeds.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Feeds and crawler files', () => {

  test('RSS feed is a valid XML document', { tag: ['@feeds'] }, async ({ When, Then, request, responses }) => { 
    await When('the visitor fetches the "RSS feed"', null, { request, responses }); 
    await Then('the response is a valid XML document', null, { responses }); 
  });

  test('Sitemap is a valid XML document', { tag: ['@feeds'] }, async ({ When, Then, request, responses }) => { 
    await When('the visitor fetches the "sitemap"', null, { request, responses }); 
    await Then('the response is a valid XML document', null, { responses }); 
  });

  test('Crawler rules match the approved version', { tag: ['@feeds'] }, async ({ When, Then, request, responses }) => { 
    await When('the visitor fetches the "crawler rules"', null, { request, responses }); 
    await Then('the response matches the approved version', null, { responses }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@feeds/feeds.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@feeds"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor fetches the \"RSS feed\"","stepMatchArguments":[{"group":{"start":24,"value":"\"RSS feed\"","children":[{"start":25,"value":"RSS feed","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the response is a valid XML document","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":9,"tags":["@feeds"],"steps":[{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the visitor fetches the \"sitemap\"","stepMatchArguments":[{"group":{"start":24,"value":"\"sitemap\"","children":[{"start":25,"value":"sitemap","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the response is a valid XML document","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":13,"tags":["@feeds"],"steps":[{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When the visitor fetches the \"crawler rules\"","stepMatchArguments":[{"group":{"start":24,"value":"\"crawler rules\"","children":[{"start":25,"value":"crawler rules","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the response matches the approved version","stepMatchArguments":[]}]},
]; // bdd-data-end