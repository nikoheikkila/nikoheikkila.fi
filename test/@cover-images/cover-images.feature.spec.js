// Generated from: feature/@cover-images/cover-images.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Cover images', () => {

  test.describe('Cover image is decorative', () => {

    test('Example #1', { tag: ['@cover-images'] }, async ({ When, Then, And, page }) => { 
      await When('the visitor opens the "latest post"', null, { page }); 
      await Then('the visitor sees the "cover image"', null, { page }); 
      await And('the "cover image" is "hidden from screen readers"', null, { page }); 
    });

    test('Example #2', { tag: ['@cover-images'] }, async ({ When, Then, And, page }) => { 
      await When('the visitor opens the "About page"', null, { page }); 
      await Then('the visitor sees the "cover image"', null, { page }); 
      await And('the "cover image" is "hidden from screen readers"', null, { page }); 
    });

  });

  test('Page cover image loads', { tag: ['@cover-images'] }, async ({ When, Then, page }) => { 
    await When('the visitor opens the "About page"', null, { page }); 
    await Then('the "cover image" is "loaded"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@cover-images/cover-images.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":11,"tags":["@cover-images"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"latest post\"","stepMatchArguments":[{"group":{"start":22,"value":"\"latest post\"","children":[{"start":23,"value":"latest post","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the \"cover image\"","stepMatchArguments":[{"group":{"start":21,"value":"\"cover image\"","children":[{"start":22,"value":"cover image","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the \"cover image\" is \"hidden from screen readers\"","stepMatchArguments":[{"group":{"start":4,"value":"\"cover image\"","children":[{"start":5,"value":"cover image","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":21,"value":"\"hidden from screen readers\"","children":[{"start":22,"value":"hidden from screen readers","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":12,"tags":["@cover-images"],"steps":[{"pwStepLine":15,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"About page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"About page\"","children":[{"start":23,"value":"About page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the \"cover image\"","stepMatchArguments":[{"group":{"start":21,"value":"\"cover image\"","children":[{"start":22,"value":"cover image","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the \"cover image\" is \"hidden from screen readers\"","stepMatchArguments":[{"group":{"start":4,"value":"\"cover image\"","children":[{"start":5,"value":"cover image","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":21,"value":"\"hidden from screen readers\"","children":[{"start":22,"value":"hidden from screen readers","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":14,"tags":["@cover-images"],"steps":[{"pwStepLine":23,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When the visitor opens the \"About page\"","stepMatchArguments":[{"group":{"start":22,"value":"\"About page\"","children":[{"start":23,"value":"About page","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the \"cover image\" is \"loaded\"","stepMatchArguments":[{"group":{"start":4,"value":"\"cover image\"","children":[{"start":5,"value":"cover image","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":21,"value":"\"loaded\"","children":[{"start":22,"value":"loaded","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end