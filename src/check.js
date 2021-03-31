import notify from './notification/index.js'
import sites from './sites/index.js'
import logger from './utils/logger.js'
import wait from './utils/wait.js'
import {
  LOOP_INTERVAL, SEARCH,
} from '../privateConfig.js'

const INTERVAL_MS = LOOP_INTERVAL * 60 * 1000 // milliseconds

// Keep track of sites to avoid redundant notifications
const sitesWithAppointments = new Set()

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
    logger.error(`${name} checker error:`, err)
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
    logger.log(`🔍 Checking ${name}\n   at ${new Date()}...`)
    const result = await runCheckerSafely(name, checker, page, SEARCH)

    if (result === true) {
      if (sitesWithAppointments.has(name)) {
        logger.log(`🤐 ${name} still has open appointments; notifications were already sent.`)
      } else {
        sitesWithAppointments.add(name)
        notify(name, url) // we're not going to `await`, we're going to multi-task
      }
    } else if (result === false) {
      sitesWithAppointments.delete(name)
      logger.log(`⛔ ${name} has no appointments open yet.`)
    } else {
      logger.log(`❓ ${name} appointment availability is unknown 🤔.`)
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

  while (true) { // eslint-disable-line no-constant-condition
    logger.log('ℹ You can exit by hitting CTRL+C ...but it may take ~10sec to fully exit.')

    await checkAllSites(page)
    
    const pauseDuration = Math.round(INTERVAL_MS / sites.length)
    logger.log(`⏳ Sites will be checked again in ~${Math.round(pauseDuration / 1000)} seconds.`)
    await wait(pauseDuration)
  }
}

export default startChecking
