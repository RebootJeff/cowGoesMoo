import notify from './notification/index.js'
import sites from './sites/index.js'
import wait from './utils/wait.js'
import {
  LOOP_INTERVAL, SEARCH,
} from '../privateConfig.js'

const INTERVAL_MS = LOOP_INTERVAL * 60 * 1000 // milliseconds

/*
 * param {String} name
 * param {function} checker
 * param {Puppeteer Page} page
 * param {Object} search config
 * returns Promise<Boolean | null> - availability status
*/
const runCheckerSafely = async (name, checker, page, searchConfig) => {
  try {
    return await checker(page, searchConfig)
  } catch (err) {
    console.error(`💥 ${name} checker error:`, err)
    return null
  }
}

/*
 * Run checkers for all sites and send notifications for positive results
 * param {Puppeteer Page} page
 * returns Promise<void> - resolution value not meant to be used
*/
const checkAllSites = async (page) => {  
  for (const {name, checker, url} of sites) {
    console.log(`🔍 Checking ${name}\n   at ${new Date()}...`)
    const result = await runCheckerSafely(name, checker, page, SEARCH)

    if (result === true) {
      notify(name, url) // we're not going to `await`, we're going to multi-task
    } else if (result === false) {
      console.log(`⛔ ${name} has no appointments open yet.`)
    } else {
      console.log(`❓ ${name} appointment availability is unknown 🤔.`)
    }
  }
}

/*
 * Continuously check sites based on config's interval
 * param {Puppeteer Browser} browser
 * returns Promise<void> - resolution value not meant to be used
*/
const startChecking = async (browser) => {
  const page = await browser.newPage()

  while (true) {
    console.log('ℹ You can exit by hitting CTRL+C ...but it may take ~10sec to fully exit.')

    await checkAllSites(page)
    
    const pauseDuration = Math.round(INTERVAL_MS / sites.length)
    console.log(`⏳ Sites will be checked again in ~${Math.round(pauseDuration / 1000)} seconds.`)
    await wait(pauseDuration)
  }
}

export default startChecking
