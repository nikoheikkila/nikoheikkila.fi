import { ExecutionContext, Macro } from 'ava'
import playwright, { Browser, Page } from 'playwright'

type Callback = (t: ExecutionContext, page: Page) => Promise<void>

export const getBrowser = (): Promise<Browser> => {
  const name = process.env.BROWSER || 'chromium'

  if (name === 'chromium') return playwright.chromium.launch()
  if (name === 'firefox') return playwright.firefox.launch()
  if (name === 'webkit') return playwright.webkit.launch()

  throw new Error(`Unsupported browser type ${name}`)
}

/**
 * AVA macro to share page context between tests.
 * @param t
 * @param callback
 */
export const withBrowser: Macro<[Callback]> = async (t, callback) => {
  const browser = await getBrowser()
  const page = await browser.newPage()

  page.on('pageerror', exception => {
    console.error(`Uncaught Exception: "${exception}"`)
  })

  try {
    await callback(t, page)
  } finally {
    await page.close()
  }
}
