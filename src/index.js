import puppeteer from 'puppeteer'

import sites from './sites/index.js'
import delay from '../utils/delay.js'

const INTERVAL = 3 * 60 * 1000 // 3 minutes in milliseconds

const checkAllSites = async (browser) => {
  try {
    for (const {name, checker, url} of sites) {
      console.log(`🔍 Checking ${name} website at ${new Date()}...`)
      const result = await checker(browser)

      if (result) {
        console.log(`✅ OMG ${name} has an appointment available!`)
        console.log(`Visit 👉 ${url} 👈 ASAP!`)
      } else {
        console.log(`⛔ ${name} has no appointments open yet.`)
      }
    }

    return delay(checkAllSites, INTERVAL, browser)
  } catch(err) {
    console.error('error:', err)
  }
}

(async () => {
  console.log('🚦 Launching browser...')
  console.log('  Hit Ctrl+C to exit early, but it may take a moment.')
  const browser = await puppeteer.launch({ headless: true })

  await checkAllSites(browser)

  console.log('🏁 Closing browser...')
  await browser.close()
  
  console.log('👋 All done! Bye bye!')
})();