import puppeteer from 'puppeteer'
import { goPage, goJD, screenshot } from './action/index.js'
import { logger } from './utils/logger.js'
import { BROWSER_CONFIG, EXIT_CODES } from './config/index.js'

async function main() {
  let browser = null

  try {
    const argument = process.argv[2]

    logger.info('应用启动', {
      argument,
      debug: process.env.DEBUG === 'true',
      logLevel: process.env.LOG_LEVEL || 'info'
    })

    logger.debug('正在启动浏览器')
    browser = await puppeteer.launch(BROWSER_CONFIG)
    logger.info('浏览器启动成功')

    switch (argument) {
      case 'page':
        logger.info('执行页面访问功能')
        const title = await goPage(browser)
        logger.info('页面访问完成', { title })
        break

      case 'screenshot':
        logger.info('执行截图功能')
        const screenshotPath = await screenshot(browser)
        logger.info('截图完成', { path: screenshotPath })
        break

      case 'jd':
        logger.info('执行京东签到功能')
        const success = await goJD(browser)
        if (success) {
          logger.info('京东签到成功')
          process.exit(EXIT_CODES.SUCCESS)
        } else {
          logger.error('京东签到失败')
          process.exit(EXIT_CODES.ERROR)
        }
        break

      default:
        logger.warn('未指定有效参数，默认执行京东签到')
        const defaultSuccess = await goJD(browser)
        if (defaultSuccess) {
          logger.info('京东签到成功')
          process.exit(EXIT_CODES.SUCCESS)
        } else {
          logger.error('京东签到失败')
          process.exit(EXIT_CODES.ERROR)
        }
    }

    logger.info('程序执行完成')
    process.exit(EXIT_CODES.SUCCESS)

  } catch (error) {
    logger.error('程序执行失败', {
      error: error.message,
      stack: error.stack
    })
    process.exit(EXIT_CODES.ERROR)
  } finally {
    if (browser) {
      try {
        await browser.close()
        logger.debug('浏览器已关闭')
      } catch (error) {
        logger.error('关闭浏览器时出错', { error: error.message })
      }
    }
  }
}

process.on('uncaughtException', (error) => {
  logger.error('未捕获的异常', {
    error: error.message,
    stack: error.stack
  })
  process.exit(EXIT_CODES.ERROR)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的Promise拒绝', {
    reason: reason?.message || reason,
    promise
  })
  process.exit(EXIT_CODES.ERROR)
})

main().catch((error) => {
  logger.error('主程序启动失败', {
    error: error.message,
    stack: error.stack
  })
  process.exit(EXIT_CODES.ERROR)
})
