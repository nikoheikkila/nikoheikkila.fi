---
name: playwright
description: Instructions for using Playwright to test the blog. Use this when you need to write, run or debug Playwright tests for the blog.
---

# End-to-End Testing with Playwright

- **Location**: Playwright tests are located under `src/__tests__/feature/`
- **Strategy**: Tests primary user flows and critical functionality
- **Configuration**: `playwright.config.ts` with local/CI environments

## Test Design Guidelines

### Locator Strategy (Priority Order)

1. **Prefer Role-based locators**: Use `page.getByRole("button", { name: "Submit" })` to select buttons by their accessible name
2. **Test IDs**: Use `page.getByTestId("submit-button")` to select dynamic elements with `data-testid` attributes
3. **Text content**: Use `page.getByText("Click me")` to select elements based on visible text
4. **Label association**: Use `page.getByLabel("Email address")` to select form fields based on their associated labels
5. **CSS selectors**: Use only as last resort and with specific justification

### Structural Requirements

```typescript
// Required imports and fixture structure
import { test, expect, type Page } from "@playwright/test";

test.describe.parallel("Given I want to test feature X", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/target-page");
  });

  test("when I perform action Y, then outcome Z should occur", async ({ page }) => {
    await test.step("Descriptive step name", async () => {
      // Test implementation
    });
  });
});

// For mobile test suites, configure viewport at the describe level
test.describe.parallel("Given I visit the page using a mobile browser", () => {
  test.use({
    hasTouch: true,
    viewport: { width: 375, height: 667 },
  });

  // Tests here run with mobile viewport
});
```

### Required Practices

**Critical:** These are mandatory practices to follow.

- ✅ Use `test.step()` to organize test actions and improve reporting
- ✅ Create fixtures objects for test-specific configuration values
- ✅ Use `await expect(locator).toBeVisible()` for auto-retrying assertions
- ✅ Group related tests with `test.describe.parallel()`
- ✅ Test mobile viewports with `test.use({ viewport: { width: 375, height: 667 }, hasTouch: true })`
- ✅ Wait for elements to become visible rather than using timeouts
- ✅ Test keyboard navigation for accessibility compliance

### Anti-Patterns

**Critical:** Avoid these at all costs.

- ❌ `page.waitForTimeout()` - Never use hard-coded timeouts
- ❌ `page.locator(".css-class")` - Avoid CSS selectors when possible
- ❌ `data-test-id` - Use `data-testid` (standard convention)
- ❌ Inline comments explaining assertions - Use descriptive test steps instead
- ❌ `any` types - Import proper types like `Page` from Playwright

### Mobile Viewport Testing

- Minimum touch target size: 44px (iOS recommendation)
- Test viewport: 375x667 (iPhone SE) for mobile scenarios
- Verify touch interactions work correctly
- Validate responsive design at multiple breakpoints

### Accessibility Testing

- Keyboard navigation must work for all interactive elements
- Use `toMatchAriaSnapshot` for component structure validation
- Test screen reader compatibility with semantic HTML
- Verify focus management and skip links functionality

### Blog-Specific Test Patterns

#### Pagination

```typescript
// Test pagination with proper edge case handling
const fixtures = {
  postsPerPage: 30,
  pagination: { minimumPostsOnPage: 1 }
};

// Check for dynamic pagination states
const nextPageExists = (await nextPageLink.count()) > 0;
if (nextPageExists) {
  await expect(nextPageLink).toBeVisible();
}
```

#### Navigation

```typescript
// Test burger menu with proper element waiting
const burgerMenuButton = page.locator(".bm-burger-button");
await burgerMenuButton.click();

// Wait for menu to become visible (not timeout)
const menuContainer = page.locator(".bm-menu");
await expect(menuContainer).toBeVisible();
```

#### Navigation Helpers

Shared navigation helpers are in `src/__tests__/feature/navigate.ts`:

```typescript
import type { Page, Locator } from "@playwright/test";

// Handle popup windows for external links
export const toExternalSiteByClicking = async (page: Page, locator: Locator): Promise<Page> => {
  const popupPromise = page.waitForEvent("popup");
  await locator.click();
  const popup = await popupPromise;
  await popup.waitForLoadState("load");
  return popup;
};

// Navigate to an internal page by clicking a link
export const toInternalPageByClicking = async (page: Page, locator: Locator): Promise<void> => {
  await Promise.all([page.waitForURL(/\//), locator.click()]);
};
```

#### Content Validation

```typescript
// Verify dynamic content differences between pages
const firstPostPage2 = await posts.first().textContent();
await page.goto("/");
const firstPostPage1 = await posts.first().textContent();

expect(firstPostPage1).not.toBe(firstPostPage2);
```

## Troubleshooting

- **E2E test failures**: Ensure production build exists and content is served from <http://localhost:8000> before running E2E tests
- **Test timeouts**: Playwright configured with 60s timeout in CI, unlimited locally
- **Component changes**: Always run `task build` after modifying React components before running E2E tests
- **Locator failures**: Use accessibility-first locators (`getByRole`, `getByTestId`) over CSS selectors
- **Element not found**: Wait for element visibility with `await expect(element).toBeVisible()` instead of timeouts
- **Mobile test failures**: Ensure touch targets meet minimum 44px size for iOS compatibility
- **Navigation menu issues**: Wait for `.bm-menu` container visibility, not just overlay
- **Pagination edge cases**: Handle dynamic pagination states where next/previous links may not exist
- **API tests (robots.txt, sitemap)**: These files are only generated in production builds
