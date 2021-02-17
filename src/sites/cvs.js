import { SEARCH } from '../../privateConfig.js'

const NAME = 'CVS'
const URL = 'https://www.cvs.com/immunizations/covid-19-vaccine'
const AVAILABLE_STATUS = 'Available'

// Selectors
const STATE_LINK = `a[data-modal='vaccineinfo-${SEARCH.state}']`
const STATUS_SPANS = '.covid-updates span.status'

const checker = async (page) => {
  await page.goto(URL)
  await page.click(STATE_LINK)

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
