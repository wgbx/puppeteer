import puppeteer from 'puppeteer'
import { goPage, goJD, screenshot } from './action/index.js'
import 'dotenv/config'

const argument = process.argv[2]
const browser = await puppeteer.launch({
  headless: process.env.DEBUG === 'true' ? false : true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})

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
