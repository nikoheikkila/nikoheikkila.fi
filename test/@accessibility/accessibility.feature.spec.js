// Generated from: feature/@accessibility/accessibility.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Accessibility', () => {

  test.describe('Page meets WCAG 2.2 AA', () => {

    test('Example #1', { tag: ['@accessibility'] }, async ({ When, Then, basePage }) => { 
      await When('the visitor opens the home page', null, { basePage }); 
      await Then('the page has no accessibility violations', null, { basePage }); 
    });

    test('Example #2', { tag: ['@accessibility'] }, async ({ When, Then, basePage }) => { 
      await When('the visitor opens the second index page', null, { basePage }); 
      await Then('the page has no accessibility violations', null, { basePage }); 
    });

    test('Example #3', { tag: ['@accessibility'] }, async ({ When, Then, basePage }) => { 
      await When('the visitor opens the latest post', null, { basePage }); 
      await Then('the page has no accessibility violations', null, { basePage }); 
    });

    test('Example #4', { tag: ['@accessibility'] }, async ({ When, Then, basePage }) => { 
      await When('the visitor opens the About page', null, { basePage }); 
      await Then('the page has no accessibility violations', null, { basePage }); 
    });

    test('Example #5', { tag: ['@accessibility'] }, async ({ When, Then, basePage }) => { 
      await When('the visitor opens the Uses page', null, { basePage }); 
      await Then('the page has no accessibility violations', null, { basePage }); 
    });

  });

  test('Skip link appears on the first Tab press', { tag: ['@accessibility'] }, async ({ Given, When, Then, basePage }) => { 
    await Given('the visitor is on the home page', null, { basePage }); 
    await When('the visitor presses "Tab"', null, { basePage }); 
    await Then('the skip link is focused', null, { basePage }); 
  });

  test('Skip link jumps to the main content', { tag: ['@accessibility'] }, async ({ Given, When, Then, And, basePage }) => { 
    await Given('the visitor is on the home page', null, { basePage }); 
    await And('the skip link is focused', null, { basePage }); 
    await When('the visitor presses "Enter"', null, { basePage }); 
    await Then('the main content is in view', null, { basePage }); 
    await And('the page address points to the main content', null, { basePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@accessibility/accessibility.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":10,"tags":["@accessibility"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":11,"tags":["@accessibility"],"steps":[{"pwStepLine":14,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the second index page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":12,"tags":["@accessibility"],"steps":[{"pwStepLine":19,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the latest post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":13,"tags":["@accessibility"],"steps":[{"pwStepLine":24,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the About page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":14,"tags":["@accessibility"],"steps":[{"pwStepLine":29,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the Uses page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the page has no accessibility violations","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":16,"tags":["@accessibility"],"steps":[{"pwStepLine":36,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the visitor presses \"Tab\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":20,"value":"\"Tab\"","children":[{"start":21,"value":"Tab","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the skip link is focused","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":21,"tags":["@accessibility"],"steps":[{"pwStepLine":42,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given the visitor is on the home page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"And the skip link is focused","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When the visitor presses \"Enter\"","pomFixtureName":"basePage","stepMatchArguments":[{"group":{"start":20,"value":"\"Enter\"","children":[{"start":21,"value":"Enter","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the main content is in view","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the page address points to the main content","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end