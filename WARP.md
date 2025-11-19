# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Quick Start

### Essential Commands

```bash
# Start development server with hot reload
task dev

# Create new blog post or page interactively
task new

# Run all tests (unit + e2e)
task test

# Format and lint codebase
task format

# Build for production
task build

# Serve production build locally
task serve
```

### Single Test Execution

```bash
# Run specific unit test file
task test:unit -- src/__tests__/unit/helpers.test.ts

# Run specific e2e test
task test:e2e -- src/__tests__/feature/index.test.ts

# Run single e2e test with UI mode
task test:e2e -- --ui
```

## Architecture Overview

This is a **Gatsby-based static site generator** for a personal blog with the following key architectural decisions:

### Content-First Architecture
- **Markdown-driven content**: Blog posts and pages are written in Markdown with frontmatter in `content/`
- **Programmatic page generation**: Pages are created dynamically in `gatsby/onCreatePages.ts`
- **GraphQL data layer**: All content is queryable through Gatsby's GraphQL interface
- **30 posts per index page**: Pagination implemented with numbered routes (`/`, `/2/`, `/3/`, etc.)

### Tech Stack
- **Runtime**: Bun (replaces Node.js for faster builds and testing)
- **Framework**: Gatsby 5 with TypeScript
- **Styling**: Sass with custom CSS architecture
- **Testing**: Bun (unit tests) + Playwright (E2E tests)
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Task Runner**: Task (Taskfile.yaml)
- **Deployment**: Netlify with automatic deployments

### Directory Structure
```
├── content/           # Markdown content (posts, pages)
│   └── blog/         # Blog post files
├── src/
│   ├── components/   # React components organized by domain
│   │   ├── blog/     # Blog-specific components
│   │   ├── layout/   # Layout and structural components
│   │   └── post/     # Post-specific components
│   ├── templates/    # Gatsby page templates
│   │   ├── list.tsx  # Blog index template
│   │   └── post.tsx  # Individual post template
│   ├── utils/        # Utility functions
│   └── __tests__/    # Test files
├── gatsby/           # Gatsby Node.js APIs
├── infra/            # Terraform infrastructure (Cloudflare)
└── static/           # Static assets
```

## Development Workflow

### Component Development
- **Modular architecture**: Components organized by domain (blog, layout, post, elements)
- **TypeScript-first**: All components use TypeScript with generated Gatsby types
- **Custom hooks**: Located in `src/components/hooks/`
- **Icon management**: FontAwesome icons managed through `useIcons` hook

### Styling Approach
- **Sass with includes**: Sass files can import from `src/styles/` directory
- **Component-scoped styles**: Each component can have co-located styles
- **Configuration**: Sass options configured in `gatsby-config.ts`

## Testing Strategy

This project follows a **use case-driven testing approach** (Classicist TDD school):

### Unit Testing (Bun)
- **Location**: `src/__tests__/unit/`
- **Framework**: Bun's built-in test runner
- **Pattern**: Test behaviors/use cases rather than individual functions
- **Example**: `helpers.test.ts` tests utility functions with descriptive scenario names

### E2E Testing (Playwright)
- **Location**: `src/__tests__/feature/`
- **Framework**: Playwright with TypeScript
- **Strategy**: Test primary user flows and critical functionality
- **Configuration**: `playwright.config.ts` with local/CI environments

#### Playwright Test Design Guidelines

**Locator Strategy (Priority Order)**:
1. **Role-based locators** (preferred): `page.getByRole("button", { name: "Submit" })`
2. **Test IDs**: `page.getByTestId("submit-button")` for dynamic content
3. **Text content**: `page.getByText("Click me")` for static text
4. **Label association**: `page.getByLabel("Email address")`
5. **CSS selectors**: Only as last resort and with specific justification

**Test Structure Requirements**:
```typescript
// Required imports and fixture structure
import { test, expect, type Page } from "@playwright/test";

const fixtures = {
  viewport: { mobile: { width: 375, height: 667 } },
  timeouts: { navigation: 5000 },
  // ... other test-specific configuration
};

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
```

**Critical Anti-patterns to Avoid**:
- ❌ `page.waitForTimeout()` - Never use hard-coded waits
- ❌ `page.locator(".css-class")` - Avoid CSS selectors when possible
- ❌ `data-test-id` - Use `data-testid` (standard convention)
- ❌ Inline comments explaining assertions - Use descriptive test steps instead
- ❌ `any` types - Import proper types like `Page` from Playwright

**Required Practices**:
- ✅ Use `test.step()` to organize test actions and improve reporting
- ✅ Create fixtures object for test-specific configuration values
- ✅ Use `await expect(locator).toBeVisible()` for auto-retrying assertions
- ✅ Group related tests with `test.describe.parallel()`
- ✅ Test mobile viewports with `page.setViewportSize(fixtures.viewport.mobile)`
- ✅ Wait for elements to become visible rather than using timeouts
- ✅ Test keyboard navigation for accessibility compliance

**Mobile Testing Standards**:
- Minimum touch target size: 44px (iOS recommendation)
- Test viewport: 375x667 (iPhone SE) for mobile scenarios
- Verify touch interactions work correctly
- Validate responsive design at multiple breakpoints

**Accessibility Testing Requirements**:
- Keyboard navigation must work for all interactive elements
- Use `toMatchAriaSnapshot` for component structure validation
- Test screen reader compatibility with semantic HTML
- Verify focus management and skip links functionality

### Test Execution Strategy
1. **Development**: `task test:watch` for continuous unit testing
2. **Local verification**: `task test:e2e` for full e2e suite
3. **CI/CD**: Automatic testing on all commits and PRs
4. **Code changes**: Always run `task build` before E2E tests when components change
5. **Debugging**: Use `task test:e2e -- --debug` for interactive debugging

#### Blog-Specific Test Patterns

**Pagination Testing**:
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

**Navigation Testing**:
```typescript
// Test burger menu with proper element waiting
const burgerMenuButton = page.locator(".bm-burger-button");
await burgerMenuButton.click();

// Wait for menu to become visible (not timeout)
const menuContainer = page.locator(".bm-menu");
await expect(menuContainer).toBeVisible();
```

**External Link Testing**:
```typescript
// Handle popup windows for external links
export const toExternalSiteByClicking = async (page: Page, locator: Locator): Promise<Page> => {
  const popupPromise = page.waitForEvent("popup");
  await locator.click();
  const popup = await popupPromise;
  await popup.waitForLoadState("load");
  return popup;
};
```

**Content Validation**:
```typescript
// Verify dynamic content differences between pages
const firstPostPage2 = await posts.first().textContent();
await page.goto("/");
const firstPostPage1 = await posts.first().textContent();
expect(firstPostPage1).not.toBe(firstPostPage2);
```

## Deployment

### Netlify Configuration
- **Build command**: `task build`
- **Publish directory**: `public/`
- **Branch**: Automatic deployments from `main` branch
- **Build environment**: Node.js with Bun runtime

### Build Process
1. **Content processing**: Markdown files transformed to HTML via `gatsby-transformer-remark`
2. **Image optimization**: Sharp-based image processing with `gatsby-plugin-image`
3. **Code splitting**: Automatic JavaScript bundling and optimization
4. **Static generation**: Full static site with optional DSG (Deferred Static Generation)

### Performance Optimizations
- **RSS feed**: Generated at `/rss.xml` with custom serializer
- **Sitemap**: Automatic generation via `gatsby-plugin-sitemap`
- **Manifest**: PWA manifest for standalone app experience
- **Offline support**: Service worker in production only

## Key Conventions

### Git Workflow
- **Micro-commits encouraged**: Author advocates for small, focused commits
- **Conventional commits**: Enforced via commitlint
- **Pre-commit hooks**: Husky + Lefthook for quality gates

### Code Quality
- **Biome configuration**: Strict formatting and linting rules
- **TypeScript strict mode**: Full type safety with generated types
- **Import organization**: Automatic import sorting and organization
- **JSX conventions**: Double quotes, trailing commas, tab indentation

### File Naming
- **Components**: PascalCase for React components
- **Utilities**: camelCase for utility functions
- **Content**: kebab-case for markdown files
- **Tests**: `*.test.ts` suffix for all test files

## Troubleshooting

### Common Build Issues
- **GraphQL queries**: Run `task dev` to access GraphQL explorer at `localhost:8000/___graphql`
- **Type generation**: Run `task build` to regenerate TypeScript types from GraphQL
- **Cache issues**: Use `task clean` to clear build cache

### Development Server Issues
- **Port conflicts**: Development server runs on <http://localhost:8000>
- **Hot reload problems**: Restart dev server if hot reload stops working
- **Asset loading**: Static assets are served from `/static` directory

### Testing Issues
- **E2E test failures**: Ensure production build exists and content is served from <http://localhost:8000> before running E2E tests
- **Test timeouts**: Playwright configured with 60s timeout in CI, unlimited locally
- **Component changes**: Always run `task build` after modifying React components before running E2E tests
- **Locator failures**: Use accessibility-first locators (`getByRole`, `getByTestId`) over CSS selectors
- **Element not found**: Wait for element visibility with `await expect(element).toBeVisible()` instead of timeouts
- **Mobile test failures**: Ensure touch targets meet minimum 44px size for iOS compatibility
- **Navigation menu issues**: Wait for `.bm-menu` container visibility, not just overlay
- **Pagination edge cases**: Handle dynamic pagination states where next/previous links may not exist
- **API tests (robots.txt, sitemap)**: These files are only generated in production builds

## Infrastructure Management

### Terraform Configuration

Infrastructure is managed in the `infra/` directory using Terraform with Cloudflare provider:

- **Zone**: Domain configuration for `nikoheikkila.fi`
- **DNS**: Records defined in YAML (`dns.yml`) for easier maintenance
- **R2 Storage**: Blog assets bucket with custom domain
- **Workers**: Custom domain mapping for Cloudflare Workers
- **State Backend**: Stored in Cloudflare R2 bucket

### Infrastructure Commands

All commands must be run from the `infra/` directory:

```bash
cd infra/

# Format Terraform code
task format

# Validate configuration
task validate

# Plan infrastructure changes
task plan

# Apply changes (after careful review)
task deploy
```

### Infrastructure Variables

Configured in `infra/cloudflare.tfvars`:

- **`account_id`** (required): CloudFlare account ID (32-char hex)
- **`domain`** (optional): Primary domain (default: `nikoheikkila.fi`)
- **`r2_bucket_name`** (optional): R2 bucket name (default: `blog`)
- **`r2_bucket_location`** (optional): Bucket location (default: `EEUR`)
- **`r2_storage_class`** (optional): Storage class (default: `Standard`)
- **`worker_service_name`** (optional): Worker service name (default: `blog`)

All variables have sensible defaults except `account_id`.

### DNS Management Workflow

1. **Edit DNS records**: Edit `infra/dns.yml`
2. **Plan changes**: `task plan` (from infra directory)
3. **Review carefully**: Check TTL, priority, proxied settings
4. **Apply**: `task deploy`
5. **Verify**: Check DNS propagation

**Important DNS Considerations**:
- Email records (MX, SPF, DKIM, DMARC) affect deliverability
- TTL=1 means "auto" (Cloudflare-managed)
- Proxied records hide origin IP but require valid SSL
- Test changes in staging if possible

### Terraform Best Practices

**Code Style**:
- Run `task format` before committing
- Add comments explaining "why", not "what"
- Include file-level headers describing purpose
- Use descriptive variable and resource names

**Making Changes**:
- Always run `task plan` before `task deploy`
- Review the plan output carefully
- Make small, focused changes (micro-commits)
- Never commit `.tfstate` files (stored remotely)

**Variable Management**:
- Add validation rules for new variables
- Provide sensible defaults where appropriate
- Document variables in README and variable descriptions
- Use type constraints (string, number, bool)

**State Management**:
- State is stored in R2 backend (no local state)
- Credentials managed via 1Password environment variables
- If state is locked, check for concurrent operations
- Only force-unlock with extreme caution: `task run -- force-unlock <LOCK_ID>`

### Infrastructure Troubleshooting

**Validation Fails**:
- Run `task format` to fix formatting issues
- Check HCL syntax in `.tf` files
- Verify YAML syntax in `dns.yml`
- Ensure variable types match definitions

**Plan Shows Unexpected Changes**:
- Check if manual changes were made via Cloudflare UI
- Verify variable values in `cloudflare.tfvars`
- Review git diff to see what changed in code
- Check for provider version changes

**State Lock Issues**:
- Wait for concurrent operations to complete
- Check if CI/CD pipeline is running
- Verify no one else is running Terraform
- Last resort: `task run -- force-unlock <LOCK_ID>`

**Authentication Issues**:
- Ensure 1Password CLI is installed and authenticated
- Verify `.env` file contains correct 1Password references
- Check `CLOUDFLARE_API_TOKEN` has sufficient permissions
- Verify R2 credentials for state backend access

### Infrastructure Outputs

View infrastructure outputs:

```bash
cd infra/
task run -- output
```

Available outputs:
- `zone_id`: CloudFlare zone ID
- `zone_name`: Domain name
- `r2_bucket_id`: R2 bucket identifier
- `r2_custom_domain`: Custom domain for R2 access
- `worker_custom_domain`: Worker hostname
- `dns_record_count`: Number of managed DNS records
