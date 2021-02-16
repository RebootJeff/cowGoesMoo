import { SEARCH } from '../../privateConfig.js'

const NAME = 'Walgreens'
const URL = 'https://www.walgreens.com/findcare/vaccination/covid-19/location-screening'
const WAIT_DURATION = 5 * 1000 // 3 seconds in milliseconds
const UNAVAILABLE_TEXT = 'Appointments unavailable'

// Selectors
const ZIP_CODE_INPUT_FIELD = '#inputLocation'
const ZIP_CODE_INPUT_BUTTON = '.form__input button'
const ALERT_PARAGRAPH = '.alert__red p'

/*
 * Looks for a banner that says there are no appointments.
 * param {Puppeteer Page} page
 * returns Promise<Boolean> - appointment availability
*/
const checkForUnavailabilityBanner = async (page) => {
  try {
    const alertText = await page.$eval(ALERT_PARAGRAPH, el => el.innerText)
    return alertText !== UNAVAILABLE_TEXT
  } catch (err) {
    // No banner found, so there is hope?
    console.log('checkForUnavailabilityBanner error (might not be bad) :', err)
    return true
  }
}

/*
 * returns Promise<Boolean> - appointment availability
*/
const checker = async (page) => {
  try {
    await page.goto(URL)
    const zipCodeInputField = await page.$(ZIP_CODE_INPUT_FIELD)

    // clear the pre-populated input by deleting 5 characters
    for (const _ of [1, 2, 3, 4, 5]) {
      await page.waitForTimeout(500)
      await zipCodeInputField.press('Backspace')
    }
    
    await zipCodeInputField.type(SEARCH.zipCode)
    await page.click(ZIP_CODE_INPUT_BUTTON)
    await page.waitForTimeout(WAIT_DURATION)
    
    return await checkForUnavailabilityBanner(page)
  } catch (err) {
    console.error(`💥 ${NAME} checker error:`, err)
  }
  
}

export default {
  name: NAME,
  checker,
  url: URL,
}
