// Generated from: feature/@cover-images/cover-images.feature
import { test } from "../../feature/fixtures.ts";

test.describe('Cover images', () => {

  test.describe('Cover image is decorative', () => {

    test('Example #1', { tag: ['@cover-images'] }, async ({ When, Then, And, basePage }) => { 
      await When('the visitor opens the latest post', null, { basePage }); 
      await Then('the visitor sees the cover image', null, { basePage }); 
      await And('the cover image is hidden from screen readers', null, { basePage }); 
    });

    test('Example #2', { tag: ['@cover-images'] }, async ({ When, Then, And, basePage }) => { 
      await When('the visitor opens the About page', null, { basePage }); 
      await Then('the visitor sees the cover image', null, { basePage }); 
      await And('the cover image is hidden from screen readers', null, { basePage }); 
    });

  });

  test('Page cover image loads', { tag: ['@cover-images'] }, async ({ When, Then, basePage }) => { 
    await When('the visitor opens the About page', null, { basePage }); 
    await Then('the cover image is loaded', null, { basePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('feature/@cover-images/cover-images.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":11,"tags":["@cover-images"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the latest post","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the cover image","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the cover image is hidden from screen readers","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":14,"pickleLine":12,"tags":["@cover-images"],"steps":[{"pwStepLine":15,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the visitor opens the About page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the visitor sees the cover image","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the cover image is hidden from screen readers","pomFixtureName":"basePage","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":14,"tags":["@cover-images"],"steps":[{"pwStepLine":23,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When the visitor opens the About page","pomFixtureName":"basePage","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the cover image is loaded","pomFixtureName":"basePage","stepMatchArguments":[]}]},
]; // bdd-data-end