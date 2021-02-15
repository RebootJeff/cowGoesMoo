import puppeteer from 'puppeteer'

import siteCheckers from './sites/index.js'

(async () => {
  console.log('🚦 Launching browser...')
  const browser = await puppeteer.launch({ headless: true })

  try {
    for (const checkAvailability of siteCheckers) {
      const result = await checkAvailability(browser)
      console.log('An appointment is available:', result)
    }
  } catch(err) {
    console.error('error:', err)
  }

  console.log('🔚 Closing browser...')
  await browser.close()
  
  console.log('👋 Bye bye')
})();