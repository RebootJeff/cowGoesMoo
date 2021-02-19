/*
 * Check for text within an element
 * param {Puppeteer Page} page
 * param {String} selector
 * param {String} text
 * returns Promise<Boolean>
*/
export const hasInnertText = async (page, selector, text) => {
  const innerText = await page.$eval(selector, el => el.innerText)
  return innerText === text
}

/*
 * Get all the text within selected elements
 * param {Puppeteer Page} page
 * param {String} selector
 * returns Promise<Array<String>>
*/
export const getInnerTexts = async (page, selector) => 
  await page.$$eval(selector, nodes => nodes.map(n => n.innerText))
