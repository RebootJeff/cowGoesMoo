import sendDesktopAlert from './desktop.js'
import sendEmailAndSMS from './emailAndSMS/index.js'
import { ENABLE_NOTIFICATION } from '../../privateConfig.js'
import logger from '../utils/logger.js'

const { desktop, emailAndSMS } = ENABLE_NOTIFICATION

/*
 * Sends notifications to all recipients.
 * param {String} pharmacy
 * param {String} url
 * returns Promise<Array> - resolution array is not meant to be used
*/
const notify = async (pharmacy, url) => {
  logger.log(`✅ OMG ${pharmacy} has an appointment available!`)
  logger.log(`\nVisit 👉 ${url} 👈 ASAP!\n`)

  return await Promise.all([
    desktop && sendDesktopAlert(pharmacy, url),
    emailAndSMS && sendEmailAndSMS(pharmacy, url),
  ])
}

export default notify
