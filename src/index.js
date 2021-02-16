import puppeteer from 'puppeteer'
import readline from 'readline'

import notify from './notification/index.js'
import sites from './sites/index.js'
import delay from '../utils/delay.js'
import { timeBetweenChecks } from '../privateConfig.js'

const INTERVAL_MS = timeBetweenChecks * 60 * 1000 // milliseconds

const checkAllSites = async (browser) => {
  console.log('ℹ You can exit by hitting CTRL+C ...but it may take a moment.')
  
  try {
    const page = await browser.newPage()
    
    for (const {name, checker, url} of sites) {
      console.log(`🔍 Checking ${name}\n   at ${new Date()}...`)
      const result = await checker(page)

      if (result === true) {
        notify(name, url) // we're not going to `await`, just move on
      } else if (result === false) {
        console.log(`⛔ ${name} has no appointments open yet.`)
      } else {
        console.log(`❓ ${name} appointment availability is unknown 🤔.`)
      }
    }

    await page.close()
    console.log(`⏳ Next round of checks will start in ${timeBetweenChecks} minutes.`)
    return delay(checkAllSites, INTERVAL_MS, browser) // here we go again
  } catch(err) {
    console.error('💥 error in checkAllSites:', err)
    process.exit()
  }
}

// Here's where the app begins 🚀
(async () => {
  console.log('🚦 Launching browser...')
  const browser = await puppeteer.launch({ headless: false }) // TODO: switch to headless after debugging

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
