import puppeteer from 'puppeteer'
import { goPage, goJD, screenshot } from './action/index.js'
import 'dotenv/config'

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
  default:
    goJD(browser)
}
