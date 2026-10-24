// Generated from: feature/@accessibility/accessibility.feature
import { test } from "playwright-bdd";

test.describe('Accessibility', () => {

  test.describe('Page meets WCAG 2.2 AA', () => {

    test('Example #1', { tag: ['@accessibility'] }, async ({ When, Then, page }) => { 
      await When('the visitor opens the "home page"', null, { page }); 
      await Then('the page has no accessibility violations', null, { page }); 
    });

    test('Example #2', { tag: ['@accessibility'] }, async ({ When, Then, page }) => { 
      await When('the visitor opens the "second index page"', null, { page }); 
      await Then('the page has no accessibility violations', null, { page }); 
    });

    test('Example #3', { tag: ['@accessibility'] }, async ({ When, Then, page }) => { 
      await When('the visitor opens the "latest post"', null, { page }); 
      await Then('the page has no accessibility violations', null, { page }); 
    });

    test('Example #4', { tag: ['@accessibility'] }, async ({ When, Then, page }) => { 
      await When('the visitor opens the "About page"', null, { page }); 
      await Then('the page has no accessibility violations', null, { page }); 
    });

    test('Example #5', { tag: ['@accessibility'] }, async ({ When, Then, page }) => { 
      await When('the visitor opens the "Uses page"', null, { page }); 
      await Then('the page has no accessibility violations', null, { page }); 
    });

  });

  test('Skip link appears on the first Tab press', { tag: ['@accessibility'] }, async ({ Given, When, Then, page }) => { 
    await Given('the visitor is on the "home page"', null, { page }); 
    await When('the visitor presses "Tab"', null, { page }); 
    await Then('the "Skip to main content link" is "focused"', null, { page }); 
  });

  test('Skip link jumps to the main content', { tag: ['@accessibility'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('the visitor is on the "home page"', null, { page }); 
    await And('the "Skip to main content link" is "focused"', null, { page }); 
    await When('the visitor presses "Enter"', null, { page }); 
    await Then('the "main content" is "in view"', null, { page }); 
    await And('the page address points to the "main content"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@accessibility/accessibility.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":10,"tags":["@accessibility"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":11,"tags":["@accessibility"],"steps":[{"pwStepLine":14,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"second index page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"second index page\"","children":[{"start":23,"value":"second index page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":12,"tags":["@accessibility"],"steps":[{"pwStepLine":19,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":13,"tags":["@accessibility"],"steps":[{"pwStepLine":24,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"About page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"About page\"","children":[{"start":23,"value":"About page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":14,"tags":["@accessibility"],"steps":[{"pwStepLine":29,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"Uses page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Uses page\"","children":[{"start":23,"value":"Uses page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":16,"tags":["@accessibility"],"steps":[{"pwStepLine":36,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the visitor presses \"Tab\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Tab\"","children":[{"start":21,"value":"Tab","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the \"Skip to main content link\" is \"focused\"","stepMatchArguments":[{"group":{"start":4,"value":"\"Skip to main content link\"","children":[{"start":5,"value":"Skip to main content link","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":35,"value":"\"focused\"","children":[{"start":36,"value":"focused","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":41,"pickleLine":21,"tags":["@accessibility"],"steps":[{"pwStepLine":42,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given the visitor is on the \"home page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"home page\"","children":[{"start":23,"value":"home page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":43,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"And the \"Skip to main content link\" is \"focused\"","stepMatchArguments":[{"group":{"start":4,"value":"\"Skip to main content link\"","children":[{"start":5,"value":"Skip to main content link","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":35,"value":"\"focused\"","children":[{"start":36,"value":"focused","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When the visitor presses \"Enter\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Enter\"","children":[{"start":21,"value":"Enter","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the \"main content\" is \"in view\"","stepMatchArguments":[{"group":{"start":4,"value":"\"main content\"","children":[{"start":5,"value":"main content","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":22,"value":"\"in view\"","children":[{"start":23,"value":"in view","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the page address points to the \"main content\"","stepMatchArguments":[{"group":{"start":31,"value":"\"main content\"","children":[{"start":32,"value":"main content","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end