// Generated from: feature/@seo/search-and-sharing.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Search engine and link previews', () => {

  test('Post description matches its excerpt', { tag: ['@seo'] }, async ({ When, Then, postPage }) => { 
    await When('the visitor opens the latest post', null, { postPage }); 
    await Then('the search description matches the post excerpt', null, { postPage }); 
  });

  test('Link preview matches the post', { tag: ['@seo'] }, async ({ When, Then, And, postPage }) => { 
    await When('the visitor opens the latest post', null, { postPage }); 
    await Then('the link preview title matches the post heading', null, { postPage }); 
    await And('the link preview address matches the post address', null, { postPage }); 
  });

  test('Link preview presents the post as an article', { tag: ['@seo'] }, async ({ When, Then, And, postPage }) => { 
    await When('the visitor opens the latest post', null, { postPage }); 
    await Then('the link preview type is "article"', null, { postPage }); 
    await And('the link preview author is "Niko Heikkilä"', null, { postPage }); 
    await And('the link preview image is served over HTTPS', null, { postPage }); 
  });

  test('Structured data describes the post', { tag: ['@seo'] }, async ({ When, Then, And, postPage }) => { 
    await When('the visitor opens the latest post', null, { postPage }); 
    await Then('the structured data names the website at the post address', null, { postPage }); 
    await And('the structured data includes a breadcrumb trail', null, { postPage }); 
  });

  test('Home page has a title and a description', { tag: ['@seo'] }, async ({ When, Then, And, basePage }) => { 
    await When('the visitor opens the home page', null, { basePage }); 
    await Then('the page title is not empty', null, { basePage }); 
    await And('the search description is not empty', null, { basePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@seo/search-and-sharing.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@seo"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor opens the latest post","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the search description matches the post excerpt","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":9,"tags":["@seo"],"steps":[{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the visitor opens the latest post","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the link preview title matches the post heading","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the link preview address matches the post address","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":14,"tags":["@seo"],"steps":[{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When the visitor opens the latest post","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the link preview type is \"article\"","pomFixtureName":"postPage","stepMatchArguments":[{"group":{"start":25,"value":"\"article\"","children":[{"start":26,"value":"article","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And the link preview author is \"Niko Heikkilä\"","pomFixtureName":"postPage","stepMatchArguments":[{"group":{"start":27,"value":"\"Niko Heikkilä\"","children":[{"start":28,"value":"Niko Heikkilä","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And the link preview image is served over HTTPS","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":20,"tags":["@seo"],"steps":[{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When the visitor opens the latest post","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the structured data names the website at the post address","pomFixtureName":"postPage","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the structured data includes a breadcrumb trail","pomFixtureName":"postPage","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":25,"tags":["@seo"],"steps":[{"pwStepLine":31,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When the visitor opens the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the page title is not empty","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And the search description is not empty","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end