/*
 * Creates a function that will run JS within the given URL
 * param {String} url
 * param {function} pageFunction
 * returns {function}
*/
const createPageEvaluator = (url, pageFunction, name) => {
  /*
  * param {Puppeteer Page} page
  * returns {any}
  */
  return async (page) => {
    let result
    
    try {
      await page.goto(url)
      result = await page.evaluate(pageFunction)
    } catch (err) {
      console.error(`💥 ${name} page evaluate error:`, err)
    }

    return result
  }
}

export default createPageEvaluator
