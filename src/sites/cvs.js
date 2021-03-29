import logger from '../utils/logger.js'

const NAME = 'CVS'
const URL = 'https://www.cvs.com/immunizations/covid-19-vaccine'

/*
 * param {Puppeteer Page} page
 * param {String} state (abbreviation)
 * param {String} city
 * returns Promise<Boolean> appointment availability
*/
const checkByLocation = async (page, state, city) => {
  const CITY_SPANS = '.covid-updates span.city'

  await page.goto(URL)
  
  const stateLink = `a[data-modal='vaccineinfo-${state}']`
  await page.click(stateLink) // opens a modal
  await page.waitForSelector(CITY_SPANS) // wait for modal to load its content

  const status = await page.$$eval(CITY_SPANS, (nodes, targetCity) => {
    const targetCitySpans = nodes.filter(n => n.innerText.toLowerCase().includes(targetCity))

    if (targetCitySpans.length !== 1) {
      return 'uh oh' // couldn't find the city in CVS's list, so let's stop here
    }

    const targetRow = targetCitySpans[0].closest('tr')
    const targetStatusSpan = targetRow.querySelector('.covid-updates span.status')
    return targetStatusSpan.innerText
  }, city.toLowerCase())

  if (status === 'uh oh') {
    logger.log(`❓ Failed to find ${city}, ${state} in the CVS list of locations. 🤔`)
  }

  return status.toLowerCase() === 'available'
}

/*
 * param {Puppeteer Page} page
 * param {Object} search config with state abbreviation
 * returns Promise<Boolean | null> - appointment availability
*/
const checker = async (page, { cities }) => {
  try {
    const citiesWithAppointments = []

    for (let location of cities) {
      const [ city, state ] = location.split(', ')
      const result = await checkByLocation(page, state, city)
      if (result === true) {
        citiesWithAppointments.push(location)
      }
    }

    // TODO: Rather than just returning a Boolean, return the list of cities
    // for better info in the notifications.
    return citiesWithAppointments.length > 0
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
