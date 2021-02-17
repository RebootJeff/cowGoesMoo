const NAME = 'CVS'
const URL = 'https://www.cvs.com/immunizations/covid-19-vaccine'
const AVAILABLE_STATUS = 'Available'

// Selectors
const STATUS_SPANS = '.covid-updates span.status'

/*
 * param {Puppeteer Page} page
 * param {Object} search config with state abbreviation
 * returns Promise<Boolean> - appointment availability
*/
const checker = async (page, { state }) => {
  await page.goto(URL)
  
  const stateLink = `a[data-modal='vaccineinfo-${state}']`
  await page.click(stateLink)

  return await page.$$eval(
    STATUS_SPANS,
    (nodes, targetText) => nodes.map(n => n.innerText).some(t => t === targetText),
    AVAILABLE_STATUS
  )
}

export default {
  name: NAME,
  checker,
  url: URL,
}
