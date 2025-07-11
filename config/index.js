import 'dotenv/config'

export const APP_CONFIG = {
  DEBUG: process.env.DEBUG === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  BROWSER_TIMEOUT: parseInt(process.env.BROWSER_TIMEOUT) || 30000,
  VIEWPORT: {
    width: parseInt(process.env.BROWSER_VIEWPORT_WIDTH) || 1920,
    height: parseInt(process.env.BROWSER_VIEWPORT_HEIGHT) || 1080
  }
}

export const BROWSER_CONFIG = {
  headless: !APP_CONFIG.DEBUG,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu'
  ],
  timeout: APP_CONFIG.BROWSER_TIMEOUT
}

export const JD_CONFIG = {
  COOKIE_KEY: 'flash',
  COOKIE_DOMAIN: '.jd.com',
  SIGN_PAGE: 'https://interact.jd.com/',
  SIGN_BUTTON: '#bean-sign-component .btn',
  COOKIE_VALUE: process.env.JD_COOKIE_VALUE
}

export const PAGE_CONFIG = {
  CHROME_DEV_PAGE: 'https://developer.chrome.com/',
  HACKER_NEWS_PAGE: 'https://news.ycombinator.com',
  WAIT_OPTIONS: {
    waitUntil: 'networkidle2',
    timeout: APP_CONFIG.BROWSER_TIMEOUT
  }
}

export const PATH_CONFIG = {
  SCREENSHOTS_DIR: 'screenshots',
  LOGS_DIR: 'logs',
  APP_LOG: 'logs/app.log',
  ERROR_LOG: 'logs/error.log'
}

export const EXIT_CODES = {
  SUCCESS: 0,
  ERROR: 1,
  INVALID_ARGUMENT: 2,
  CONFIG_ERROR: 3,
  NETWORK_ERROR: 4
}
