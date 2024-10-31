import puppeteer from 'puppeteer'

export async function goPage() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage({})
  await page.goto('https://developer.chrome.com/')
  await page.setViewport({ width: 1080, height: 1024 })
  await page.locator('.devsite-search-field').fill('automate beyond recorder')
  await page.locator('.devsite-result-item-link').click()

  const textSelector = await page.locator('text/Customize and automate').waitHandle()
  const fullTitle = await textSelector?.evaluate(el => el.textContent)
  await browser.close()
  console.log('The title of this blog post is "%s".', fullTitle)
}
