import { createFolderSync, timestampFileName, isValidUrl } from '../utils/index.js'
import { logger } from '../utils/logger.js'
import { PAGE_CONFIG, PATH_CONFIG, EXIT_CODES } from '../config/index.js'

export async function screenshot(browser, options = {}) {
  const {
    url = PAGE_CONFIG.HACKER_NEWS_PAGE,
    filename = timestampFileName('png'),
    viewport = { width: 1920, height: 1080 }
  } = options

  let page = null

  try {
    if (!isValidUrl(url)) {
      throw new Error(`无效的URL: ${url}`)
    }

    logger.info('开始截图', { url, filename })

    page = await browser.newPage()

    await page.setViewport(viewport)

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    logger.debug('正在加载页面', { url })
    await page.goto(url, PAGE_CONFIG.WAIT_OPTIONS)

    await page.waitForTimeout(2000)

    const screenshotDir = createFolderSync(PATH_CONFIG.SCREENSHOTS_DIR)
    const screenshotPath = `${screenshotDir}/${filename}`

    logger.debug('正在截图', { path: screenshotPath })
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      quality: 90
    })

    logger.info('截图完成', { path: screenshotPath })
    return screenshotPath

  } catch (error) {
    logger.error('截图失败', {
      url,
      error: error.message,
      stack: error.stack
    })
    throw error
  } finally {
    if (page) {
      await page.close()
    }
  }
}
