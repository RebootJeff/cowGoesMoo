import puppeteer from 'puppeteer'
import readline from 'readline'

import logger from './utils/logger.js'
import startChecking from './check.js'
import {
  HIDE_BROWSER, BROWSER_SIZE,
} from '../privateConfig.js'

// TODO: This isn't working as intended. I'm not sure it's even being invoked.
const shutDown = async (browser) => {
  logger.log('🏁 Closing browser...')
  await browser.close()
  process.exit(0)
}

// Here's where the app begins 🚀
(async () => {
  logger.log('🚦 Launching browser...')
  const { height, width } = BROWSER_SIZE
  const browser = await puppeteer.launch({
    headless: HIDE_BROWSER,
    defaultViewport: { width, height },
    args: [`--window-size=${width},${height}`]
  })

  process.on('SIGINT', () => shutDown(browser))
  process.on('SIGQUIT', () => shutDown(browser))
  process.on('SIGTERM', () => shutDown(browser))

  // TODO: Inspect the `code` parameter and log accordingly
  process.on('exit', () => {
    logger.log('👋 Shutdown completed! Bye bye!')
  });

  try {
    startChecking(browser)
  } catch (err) {
    logger.error('💥 Loop failure:', err)
    await shutDown()
    process.exit(1)
  }
})();
