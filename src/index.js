import puppeteer from 'puppeteer'
import readline from 'readline'

import checkAllSites from './check.js'
import {
  HIDE_BROWSER, BROWSER_SIZE,
} from '../privateConfig.js'

// Here's where the app begins 🚀
(async () => {
  console.log('🚦 Launching browser...')
  const { height, width } = BROWSER_SIZE
  const browser = await puppeteer.launch({
    headless: HIDE_BROWSER,
    defaultViewport: { width, height },
    args: [`--window-size=${width},${height}`]
  })

  if (process.platform === 'win32') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.on('SIGINT', () => process.emit('SIGINT'))
  }

  // TODO: This still seems slightly buggy ("Bye bye!" message is never shown)
  process.on('exit', async () => {
    console.log('🏁 Closing browser...')
    await browser.close()
    console.log('👋 All done! Bye bye!')
  });

  const page = await browser.newPage()
  await checkAllSites(page)
})();
