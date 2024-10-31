import { createFolderSync, randomString } from '../utils/index.js'

export async function screenshot(browser) {
  const page = await browser.newPage()
  await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' })
  createFolderSync('screenshot')
  await page.screenshot({ path: `screenshot/${randomString()}.png` })
  await browser.close()
}
