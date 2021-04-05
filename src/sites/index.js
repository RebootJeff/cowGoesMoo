import cvs from './cvs.js'
import debugSite from './debugSite.js' // eslint-disable-line no-unused-vars
import vaccineSpotter from './vaccineSpotter.js'
import walgreens from './walgreens.js'

const siteCheckers = [
  // debugSite,
  cvs,
  vaccineSpotter,
  walgreens,
]

export default siteCheckers
