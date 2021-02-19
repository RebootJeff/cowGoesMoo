import logger from '../utils/logger.js'

const NAME = 'CVS'
const URL = 'https://www.cvs.com/immunizations/covid-19-vaccine'
const AVAILABLE_STATUS = 'Available'

// Selectors
const STATUS_SPANS = '.covid-updates span.status'

/*
 * param {Puppeteer Page} page
 * param {Object} search config with state abbreviation
 * returns Promise<Boolean | null> - appointment availability
*/
const checker = async (page, { state }) => {
  await page.goto(URL)
  
  const stateLink = `a[data-modal='vaccineinfo-${state}']`
  await page.click(stateLink)

  try {
    return getInnerTexts(page, STATUS_SPANS)
      .some(t => t === AVAILABLE_STATUS)
  } catch (err) {
    logger.error('CVS checker error:', err)
    return null // status unknown
  }
  
}

export default {
  name: NAME,
  checker,
  url: URL,
}
