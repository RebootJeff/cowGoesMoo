import fetch from 'cross-fetch';

import logger from '../utils/logger.js'

const NAME = 'Vaccine Spotter'
const URL = 'https://www.vaccinespotter.org'

// NOTE: Vaccine Spotter's author told me the data is updated once per minute.
// https://twitter.com/nickblah/status/1377050556452208643
const getApiUrl = state => `https://www.vaccinespotter.org/api/v0/states/${state}.json`

/*
 * param {String} state (abbreviation)
 * param {String} city
 * returns Promise<Boolean> appointment availability
*/
const checkByLocation = async (state, city) => {
  const apiUrl = getApiUrl(state.toUpperCase())
  const response = await fetch(apiUrl)
  // TODO: Cache response with a 1-minute TTL

  if (response.status >= 400) {
    throw new Error(`Bad response from ${NAME} API: ${response.status}`)
  }

  const responseJson = await response.json()
  return responseJson.features.some(({properties}) => {
    return properties.city &&
      properties.city.toLowerCase() === city.toLowerCase() &&
      properties.appointments_available
  })
}

/*
 * param {Puppeteer Page} _
 * param {Object} search config with state abbreviation
 * returns Promise<Boolean | null> - appointment availability
*/
const checker = async (_, { cities }) => {
  try {
    const locationsWithAppointments = []

    for (let location of cities) {
      const [ city, state ] = location.split(', ')
      const result = await checkByLocation(state, city)
      if (result === true) {
        locationsWithAppointments.push(location)
      }
    }

    // TODO: Rather than just returning a Boolean, return the list of locations
    // for better info in the notifications.
    if (locationsWithAppointments.length > 0) {
      logger.log(
        `🏙 Matching cities w/appointments on ${NAME}: ${locationsWithAppointments.join('; ')}`
      )
      return true
    } else {
      return false
    }
  } catch (err) {
    logger.error(`${NAME} checker error:`, err)
    return null // status unknown
  }
  
}

export default {
  name: NAME,
  checker,
  url: URL,
}
