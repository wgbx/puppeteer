import puppeteer from 'puppeteer'
import { goPage } from './utils/index.js'

const argument = process.argv[2]
const browser = await puppeteer.launch({ headless: false })

if (argument === 'page') {
  goPage(browser)
}
