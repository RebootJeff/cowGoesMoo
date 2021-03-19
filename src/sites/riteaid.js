import createPageEvaluator from '../../utils/createPageEvaluator.js'

const URL = 'https://www.riteaid.com/pharmacy/apt-scheduler'

/*
 * returns Promise<Boolean> - appointment availability
*/
const fetchData = async () => {
  // const FETCH_URL = 'TODO'
  // const FETCH_CONFIG = {
  //   'credentials': 'include',
  //   'headers': {
  //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
  //       'Accept': 'application/json, text/plain, */*',
  //       'Accept-Language': 'en-US,en;q=0.5',
  //       'Content-Type': 'application/json; charset=utf-8'
  //   },
  //   'referrer': FETCH_URL,
  //   'body': '{\'serviceId\':\'99\',\'position\':{\'latitude\':39.2673283,\'longitude\':-76.7983067},\'appointmentAvailability\':{\'startDateTime\':\'2021-02-15\'},\'radius\':25}',
  //   'method': 'POST',
  //   'mode': 'cors'
  // }
  
  // // `window` reference means this must be run within context of Puppeteer page
  // return await window.fetch(FETCH_URL, FETCH_CONFIG)
  //   .then(res => res.json())
  //   .then(json => {
  //   })
}

export default {
  name: 'Rite Aid',
  checker: createPageEvaluator(URL, fetchData),
  url: URL,
}
