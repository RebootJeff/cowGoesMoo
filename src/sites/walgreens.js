import { hasInnertText } from '../utils/page.js'

const NAME = 'Walgreens'
const URL = 'https://www.walgreens.com/findcare/vaccination/covid-19/location-screening'

const HAPPY_TEXT = 'Appointments available!'
const SAD_TEXT = 'Appointments unavailable'

// Selectors
const ZIP_CODE_INPUT_FIELD = '#inputLocation'
const ZIP_CODE_INPUT_BUTTON = '.form__input button'
const HAPPY_BANNER = '.alert__green p'
const SAD_BANNER = '.alert__red p'

/*
 * Looks for banners re:appointment availability
 * Sometimes, the Walgreens site is buggy and it will show both banners or neither.
 * param {Puppeteer Page} page
 * returns Promise<boolean> - appointment availability
*/
const checkBanners = async (page) => {
  let happy
  let sad

  try {
    happy = await hasInnertText(page, HAPPY_BANNER, HAPPY_TEXT)
  } catch (_) { /* banner just isn't on the page */ }

  try {
    sad = await hasInnertText(page, SAD_BANNER, SAD_TEXT)
  } catch (_) { /* banner just isn't on the page */ }

  if (happy === true && sad === undefined) {
    return true
  } else if (sad === true && happy === undefined) {
    return false
  }

  return null // status unknown
}

/*
 * param {Puppeteer Page} page
 * param {Object} search config with zipCode
 * returns Promise<boolean> - appointment availability
*/
const checker = async (page, { zipCode }) => {
  await page.goto(URL)
  const zipCodeInputField = await page.$(ZIP_CODE_INPUT_FIELD)

  // Clear the pre-populated input by deleting 6 characters
  // NOTE: Pre-populated zip code should only be 5 digits,
  // but it doesn't always work if I only delete 5 times.
  for (const _ of [1, 2, 3, 4, 5, 6]) {
    await zipCodeInputField.press('Backspace')
    await page.waitForTimeout(250)
  }
  
  await zipCodeInputField.type(zipCode)
  await page.waitForTimeout(500)
  await page.click(ZIP_CODE_INPUT_BUTTON)

  // Sometimes, the Walgreens site takes awhile to display a banner
  await page.waitForTimeout(4000)
  
  return await checkBanners(page)
}

export default {
  name: NAME,
  checker,
  url: URL,
}
