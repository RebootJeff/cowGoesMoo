import puppeteer from 'puppeteer'

import logger from './utils/logger.js'
import startChecking from './check.js'
import {
  HIDE_BROWSER, BROWSER_SIZE,
} from '../privateConfig.js'

// TODO: On Windows, there is a long pause between the browser closing and exiting the process.
const shutDown = async (code = 0) => {
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
  const browser = await puppeteer.launch({
    headless: HIDE_BROWSER,
    defaultViewport: { width, height },
    args: [`--window-size=${width},${height}`]
  })

  try {
    await startChecking(browser)
  } catch (err) {
    logger.error('💥 App failure:', err)
    await shutDown(1)
  }
}

start()
