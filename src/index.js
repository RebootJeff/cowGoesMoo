import puppeteer from 'puppeteer'
import readline from 'readline'

import notify from './notify.js'
import sites from './sites/index.js'
import delay from '../utils/delay.js'

const INTERVAL = 3 * 60 * 1000 // 3 minutes in milliseconds

const remindHowToExit = () => {
  console.log('You can exit by hitting CTRL+C ...but it may take a moment.')
}

const checkAllSites = async (browser) => {
  remindHowToExit()
  
  try {
    const page = await browser.newPage()
    
    for (const {name, checker, url} of sites) {
      console.log(`🔍 Checking ${name} website at ${new Date()}...`)
      const result = await checker(page)

      if (result) {
        notify(name, url)
      } else if (result === false) { // `result` could be undefined if there was a problem fetching data
        console.log(`⛔ ${name} has no appointments open yet.`)
      }
    }

    await page.close()
    
    return delay(checkAllSites, INTERVAL, page) // here we go again
  } catch(err) {
    console.error('💥 error in checkAllSites:', err)
    process.exit()
  }
}

(async () => {
  console.log('🚦 Launching browser...')
  const browser = await puppeteer.launch({ headless: false })

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
