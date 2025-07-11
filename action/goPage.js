import { JD_CONFIG, PAGE_CONFIG, APP_CONFIG, EXIT_CODES } from '../config/index.js'
import { logger } from '../utils/logger.js'
import { delay, isValidUrl } from '../utils/tool.js'

export async function goPage(browser) {
  let page = null

  try {
    logger.info('开始访问Chrome开发者文档')

    page = await browser.newPage()
    await page.setViewport(APP_CONFIG.VIEWPORT)

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    logger.debug('正在加载页面', { url: PAGE_CONFIG.CHROME_DEV_PAGE })
    await page.goto(PAGE_CONFIG.CHROME_DEV_PAGE, PAGE_CONFIG.WAIT_OPTIONS)

    await page.waitForSelector('.devsite-search-field', { timeout: 10000 })

    logger.debug('正在搜索内容')
    await page.locator('.devsite-search-field').fill('automate beyond recorder')

    await delay(1000)

    await page.locator('.devsite-result-item-link').first().click()

    await page.waitForSelector('text/Customize and automate', { timeout: 10000 })

    const textSelector = await page.locator('text/Customize and automate').first()
    const fullTitle = await textSelector.evaluate(el => el.textContent)

    logger.info('页面访问成功', { title: fullTitle })
    return fullTitle

  } catch (error) {
    logger.error('页面访问失败', {
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

export async function goJD(browser) {
  let page = null

  try {
    if (!JD_CONFIG.COOKIE_VALUE) {
      throw new Error('京东Cookie未配置，请在.env文件中设置JD_COOKIE_VALUE')
    }

    logger.info('开始京东签到')

    page = await browser.newPage()
    await page.setViewport(APP_CONFIG.VIEWPORT)

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    logger.debug('正在设置Cookie')
    await page.setCookie({
      name: JD_CONFIG.COOKIE_KEY,
      value: JD_CONFIG.COOKIE_VALUE,
      domain: JD_CONFIG.COOKIE_DOMAIN
    })

    logger.debug('正在访问签到页面', { url: JD_CONFIG.SIGN_PAGE })
    await page.goto(JD_CONFIG.SIGN_PAGE, PAGE_CONFIG.WAIT_OPTIONS)

    await delay(2000)

    logger.debug('正在查找签到按钮')
    const signButton = await page.waitForSelector(JD_CONFIG.SIGN_BUTTON, {
      timeout: 10000,
      visible: true
    })

    logger.debug('正在点击签到按钮')
    await signButton.click()

    await delay(2000)

    logger.info('京东签到成功')
    return true

  } catch (error) {
    logger.error('京东签到失败', {
      error: error.message,
      stack: error.stack
    })
    return false
  } finally {
    if (page) {
      await page.close()
    }
  }
}
