import puppeteer from 'puppeteer'
import readline from 'readline'

import sites from './sites/index.js'
import delay from '../utils/delay.js'

const INTERVAL = 3 * 60 * 1000 // 3 minutes in milliseconds

const remindHowToExit = () => {
  console.log('You can exit by hitting CTRL+C ...but it may take a moment.')
}

const checkAllSites = async (browser) => {
  remindHowToExit()
  
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
  const browser = await puppeteer.launch({ headless: true })

  // TODO: This still seems slightly buggy on Windows
  if (process.platform === 'win32') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.on('SIGINT', () => process.emit('SIGINT'))
  }

  process.on('exit', async () => {
    console.log('🏁 Closing browser...')
    await browser.close()
    console.log('👋 All done! Bye bye!')
  });

  await checkAllSites(browser)
})();
