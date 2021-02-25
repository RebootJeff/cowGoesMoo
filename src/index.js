import puppeteer from 'puppeteer'

import logger from './utils/logger.js'
import startChecking from './check.js'
import {
  HIDE_BROWSER, BROWSER_SIZE,
} from '../privateConfig.js'

let browser

// TODO: On Windows, there is a long pause between the browser closing and "Closing browser..."
// getting logged. Somehow CTRL+C stops Puppeteer browser before this function runs.
// And why is there such a long pause?
const shutDown = async (code = 0) => {
  if (browser) {
    logger.log('🏁 Closing browser...')
    await browser.close() // TODO: Node doesn't seem to wait for this.
    console.log('why doesn\'t this show up?')
  }
  process.exit(code)
}

process.on('SIGINT', shutDown)
process.on('SIGQUIT', shutDown)
process.on('SIGTERM', shutDown)

process.on('exit', () => {
  // TODO: Inspect the `code` parameter and log accordingly
  logger.log('👋 Shutdown completed! Bye bye!')
})

// Here's where the app begins 🚀
const start = async () => {
  logger.log('🚦 Launching browser...')
  const { height, width } = BROWSER_SIZE
  browser = await puppeteer.launch({
    headless: HIDE_BROWSER,
    defaultViewport: { width, height },
    args: [`--window-size=${width},${height}`]
  })

  try {
    startChecking(browser)
  } catch (err) {
    logger.error('💥 App failure:', err)
    await shutDown(1)
  }
}

start()
