import puppeteer from 'puppeteer'
import readline from 'readline'

import notify from './notification/index.js'
import sites from './sites/index.js'
import { LOOP_INTERVAL, HIDE_BROWSER, BROWSER_SIZE } from '../privateConfig.js'

const INTERVAL_MS = LOOP_INTERVAL * 60 * 1000 // milliseconds

const checkAllSites = async (browser) => {
  console.log('ℹ You can exit by hitting CTRL+C ...but it may take a moment.')
  
  try {
    for (const {name, checker, url} of sites) {
      console.log(`🔍 Checking ${name}\n   at ${new Date()}...`)
      const page = await browser.newPage()
      const result = await checker(page)

      if (result === true) {
        notify(name, url) // we're not going to `await`, just move on
      } else if (result === false) {
        console.log(`⛔ ${name} has no appointments open yet.`)
      } else {
        console.log(`❓ ${name} appointment availability is unknown 🤔.`)
      }

      const pauseDuration = Math.round(INTERVAL_MS / sites.length)
      console.log(`⏳ Next site will be checked in ~${Math.round(pauseDuration / 1000)} seconds.`)
      await page.waitForTimeout(pauseDuration)
      await page.close()
    }

    return checkAllSites(browser) // here we go again
  } catch(err) {
    console.error('💥 error in checkAllSites:', err)
    process.exit()
  }
}

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

  await checkAllSites(browser)
})();
