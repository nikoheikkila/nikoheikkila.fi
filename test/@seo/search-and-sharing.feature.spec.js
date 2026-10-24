// Generated from: feature/@seo/search-and-sharing.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Search engine and link previews', () => {

  test('Post description matches its excerpt', { tag: ['@seo'] }, async ({ When, Then, page }) => { 
    await When('the visitor opens the "latest post"', null, { page }); 
    await Then('the page description matches the post "excerpt"', null, { page }); 
  });

  test('Link preview matches the post', { tag: ['@seo'] }, async ({ When, Then, And, page }) => { 
    await When('the visitor opens the "latest post"', null, { page }); 
    await Then('the page "link preview title" matches the post "heading"', null, { page }); 
    await And('the page "link preview address" matches the post "link"', null, { page }); 
  });

  test('Link preview presents the post as an article', { tag: ['@seo'] }, async ({ When, Then, And, page }) => { 
    await When('the visitor opens the "latest post"', null, { page }); 
    await Then('the page "link preview type" is "article"', null, { page }); 
    await And('the page "link preview author" is "Niko Heikkilä"', null, { page }); 
    await And('the page "link preview image protocol" is "HTTPS"', null, { page }); 
  });

  test('Structured data describes the post', { tag: ['@seo'] }, async ({ When, Then, And, page }) => { 
    await When('the visitor opens the "latest post"', null, { page }); 
    await Then('the page "structured data" includes website name at the post address', null, { page }); 
    await And('the page "structured data" includes a breadcrumb trail', null, { page }); 
  });

  test('Home page has a title and a description', { tag: ['@seo'] }, async ({ When, Then, And, page }) => { 
    await When('the visitor opens the "home page"', null, { page }); 
    await Then('the page "title" is "non-empty"', null, { page }); 
    await And('the page "search description" is "non-empty"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@seo/search-and-sharing.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@seo"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the page description matches the post \"excerpt\"","stepMatchArguments":[{"group":{"start":38,"value":"\"excerpt\"","children":[{"start":39,"value":"excerpt","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":11,"pickleLine":9,"tags":["@seo"],"steps":[{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the page \"link preview title\" matches the post \"heading\"","stepMatchArguments":[{"group":{"start":9,"value":"\"link preview title\"","children":[{"start":10,"value":"link preview title","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":47,"value":"\"heading\"","children":[{"start":48,"value":"heading","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the page \"link preview address\" matches the post \"link\"","stepMatchArguments":[{"group":{"start":9,"value":"\"link preview address\"","children":[{"start":10,"value":"link preview address","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":49,"value":"\"link\"","children":[{"start":50,"value":"link","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":14,"tags":["@seo"],"steps":[{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the page \"link preview type\" is \"article\"","stepMatchArguments":[{"group":{"start":9,"value":"\"link preview type\"","children":[{"start":10,"value":"link preview type","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":32,"value":"\"article\"","children":[{"start":33,"value":"article","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And the page \"link preview author\" is \"Niko Heikkilä\"","stepMatchArguments":[{"group":{"start":9,"value":"\"link preview author\"","children":[{"start":10,"value":"link preview author","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":34,"value":"\"Niko Heikkilä\"","children":[{"start":35,"value":"Niko Heikkilä","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And the page \"link preview image protocol\" is \"HTTPS\"","stepMatchArguments":[{"group":{"start":9,"value":"\"link preview image protocol\"","children":[{"start":10,"value":"link preview image protocol","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":42,"value":"\"HTTPS\"","children":[{"start":43,"value":"HTTPS","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":24,"pickleLine":20,"tags":["@seo"],"steps":[{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the page \"structured data\" includes website name at the post address","stepMatchArguments":[{"group":{"start":9,"value":"\"structured data\"","children":[{"start":10,"value":"structured data","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the page \"structured data\" includes a breadcrumb trail","stepMatchArguments":[{"group":{"start":9,"value":"\"structured data\"","children":[{"start":10,"value":"structured data","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":25,"tags":["@seo"],"steps":[{"pwStepLine":31,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the page \"title\" is \"non-empty\"","stepMatchArguments":[{"group":{"start":9,"value":"\"title\"","children":[{"start":10,"value":"title","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":20,"value":"\"non-empty\"","children":[{"start":21,"value":"non-empty","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And the page \"search description\" is \"non-empty\"","stepMatchArguments":[{"group":{"start":9,"value":"\"search description\"","children":[{"start":10,"value":"search description","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":33,"value":"\"non-empty\"","children":[{"start":34,"value":"non-empty","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end