import puppeteer from 'puppeteer'

/*
 * returns Promise<Boolean> - appointment availability
*/
const getCVSInfo = async () => {
  const CVS_URL = 'https://www.cvs.com/immunizations/covid-19-vaccine.vaccine-status.MD.json?vaccineinfo'
  const CVS_CONFIG = {
    'credentials': 'include',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    },
    'referrer': 'https://www.cvs.com/immunizations/covid-19-vaccine',
    'method': 'GET',
    'mode': 'cors'
  }
  
  // `window` reference means this must be run within context of Puppeteer page
  return await window.fetch(CVS_URL, CVS_CONFIG)
    .then(res => res.json())
    .then(json => {
      const cities = json.responsePayloadData.data.MD
      return cities.some(city => city.status !== 'Fully Booked')
    })
}

/*
 * param {Puppeteer Browser} browser
 * returns Promise<Boolean> - appointment availability
*/
const checkAvailability = async (browser) => {
  const page = await browser.newPage()
  
  console.log('🕸 Checking CVS website...')
  await page.goto('https://www.cvs.com/immunizations/covid-19-vaccine')

  let availability
  try {
    availability = await page.evaluate(getCVSInfo)
  } catch (err) {
    console.error('page.evaluate error:', err)
  }

  return availability
}

export default checkAvailability