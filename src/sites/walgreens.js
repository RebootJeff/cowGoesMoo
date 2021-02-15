import { search } from '../../privateConfig.js'

const URL = 'https://www.walgreens.com/findcare/vaccination/covid-19/location-screening'
const WAIT_DURATION = 3 * 1000 // 3 seconds in milliseconds
const UNAVAILABLE_TEXT = 'Appointments unavailable'

// Selectors
const ZIP_CODE_INPUT_FIELD = '#inputLocation'
const ZIP_CODE_INPUT_BUTTON = '.form__input button'
const ALERT_PARAGRAPH = '.alert__red p'

/*
 * returns Promise<Boolean> - appointment availability
*/
const checker = async (page) => {
  await page.goto(URL)
  const $zipCodeInputField = await page.$(ZIP_CODE_INPUT_FIELD)

  // clear the automatic input by deleting 5 characters
  for(const _ of [1, 2, 3, 4, 5]) {
    await $zipCodeInputField.press('Backspace')
  }
  
  await $zipCodeInputField.type(search.zipCode)
  await page.click(ZIP_CODE_INPUT_BUTTON)
  await page.waitForTimeout(WAIT_DURATION)
  
  const alertText = await page.$eval(ALERT_PARAGRAPH, el => el.innerText)
  return alertText !== UNAVAILABLE_TEXT
}

export default {
  name: 'Walgreens',
  checker,
  url: URL,
}
