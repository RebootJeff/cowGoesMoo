import puppeteer from 'puppeteer'

import checkAvailability from './sites/cvs/browse.js'

(async () => {
  console.log('🚦 Launching browser...')
  const browser = await puppeteer.launch({ headless: true })

  try {
    const result = await checkAvailability(browser)
    console.log('An appointment is available:', result)
  } catch(err) {
    console.error('error:', err)
  }

  console.log('🔚 Closing browser...')
  await browser.close()
  
  console.log('👋 Bye bye')
})();