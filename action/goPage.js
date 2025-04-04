import { JD_COOKIE_KEY, JD_COOKIE_DOMAIN, JD_SIGN_PAGE, JD_SIGN_BUTTON } from '../constant/index.js'

export async function goPage(browser) {
  const page = await browser.newPage({})
  await page.goto('https://developer.chrome.com/')
  await page.locator('.devsite-search-field').fill('automate beyond recorder')
  await page.locator('.devsite-result-item-link').click()

  const textSelector = await page.locator('text/Customize and automate').waitHandle()
  const fullTitle = await textSelector?.evaluate(el => el.textContent)
  await browser.close()
  console.log('The title of this blog post is "%s".', fullTitle)
}

export async function goJD(browser) {
  const page = await browser.newPage({})
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setCookie({ name: JD_COOKIE_KEY, value: process.env.JD_COOKIE_VALUE, domain: JD_COOKIE_DOMAIN })
  await page.goto(JD_SIGN_PAGE)
  try {
    const signButton = await page.waitForSelector(JD_SIGN_BUTTON, { timeout: 1000 })
    await signButton.click()
    console.info('🚀 ~ goJD:', '签到成功')
    await browser.close()
    process.exit(0)
  } catch (err) {
    console.error('🚀 ~ goJD:', '失败')
    process.exit(1)
  }
}
