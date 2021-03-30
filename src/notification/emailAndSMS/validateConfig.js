import logger from '../../utils/logger.js'

/*
 * Checks that the config file contains all the necessary email fields.
 * param {Object} sender
 * param {Object} recipients
 * returns Boolean
*/
export default (sender, recipient) => {
  try {
    return sender.address &&
      sender.name &&
      sender.password &&
      sender.service &&
      recipient.address &&
      recipient.name
  } catch (err) {
    logger.error('💥 privateConfig.js is missing sender or recipient info:', err)
    return false
  }
}
