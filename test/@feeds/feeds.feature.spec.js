// Generated from: feature/@feeds/feeds.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Feeds and crawler files', () => {

  test('RSS feed is a valid XML document', { tag: ['@feeds'] }, async ({ When, Then, fetched, request }) => { 
    await When('the visitor fetches "/rss.xml"', null, { fetched, request }); 
    await Then('the response is a valid XML document', null, { fetched }); 
  });

  test('Sitemap is a valid XML document', { tag: ['@feeds'] }, async ({ When, Then, fetched, request }) => { 
    await When('the visitor fetches "/sitemap-index.xml"', null, { fetched, request }); 
    await Then('the response is a valid XML document', null, { fetched }); 
  });

  test('Crawler rules match the approved version', { tag: ['@feeds'] }, async ({ When, Then, fetched, request }) => { 
    await When('the visitor fetches "/robots.txt"', null, { fetched, request }); 
    await Then('the response matches the approved version', null, { fetched }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@feeds/feeds.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@feeds"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor fetches \"/rss.xml\"","stepMatchArguments":[{"group":{"start":20,"value":"\"/rss.xml\"","children":[{"start":21,"value":"/rss.xml","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the response is a valid XML document","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":9,"tags":["@feeds"],"steps":[{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the visitor fetches \"/sitemap-index.xml\"","stepMatchArguments":[{"group":{"start":20,"value":"\"/sitemap-index.xml\"","children":[{"start":21,"value":"/sitemap-index.xml","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the response is a valid XML document","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":13,"tags":["@feeds"],"steps":[{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When the visitor fetches \"/robots.txt\"","stepMatchArguments":[{"group":{"start":20,"value":"\"/robots.txt\"","children":[{"start":21,"value":"/robots.txt","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the response matches the approved version","stepMatchArguments":[]}]},
]; // bdd-data-end