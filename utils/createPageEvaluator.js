/*
 * Creates a function that will run JS within the given URL
 * param {String} url
 * param {function} pageFunction
 * returns {function}
*/
const createPageEvaluator = (url, pageFunction) => {
  /*
  * param {Puppeteer Page} page
  * returns {any}
  */
  return async (page) => {
    await page.goto(url)

    let result
    try {
      result = await page.evaluate(pageFunction)
      console.log(result)
    } catch (err) {
      console.error('💥 page.evaluate error:', err)
      process.exit() // TODO: remove this after debugging
    }

    return result
  }
}

export default createPageEvaluator
