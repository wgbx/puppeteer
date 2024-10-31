import puppeteer from 'puppeteer'
import { goPage, screenshot } from './action/index.js'

const argument = process.argv[2]
const scriptName = process.env.npm_lifecycle_event
const browser = await puppeteer.launch({ headless: scriptName === 'dev' ? false : true })

switch (argument) {
  case 'page':
    goPage(browser)
    break
  case 'screenshot':
    screenshot(browser)
    break
}
