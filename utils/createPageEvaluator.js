/*
 * Creates a function that will run JS within the given URL
 * param {String} url
 * param {function} pageFunction
 * returns {function}
*/
const createPageEvaluator = (url, pageFunction) => {
  /*
  * param {Puppeteer Browser} browser
  * returns {any}
  */
  return async (browser) => {
    const page = await browser.newPage()
    await page.goto(url)

    let result
    try {
      result = await page.evaluate(pageFunction)
    } catch (err) {
      console.error('💥 page.evaluate error:', err)
    }

    return result
  }
}

export default createPageEvaluator
