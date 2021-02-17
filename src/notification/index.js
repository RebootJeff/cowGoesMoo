import sendDesktopAlert from './desktop.js'
import sendEmailAndSMS from './email/index.js'
import { ENABLE_NOTIFICATION } from '../../privateConfig.js'

const { desktop, emailAndSMS } = ENABLE_NOTIFICATION

/*
 * Sends notifications to all recipients.
 * param {String} pharmacy
 * param {String} url
 * returns Promise<Array> - resolution array is not meant to be used
*/
const notify = async (pharmacy, url) => {
  console.log(`✅ OMG ${pharmacy} has an appointment available!`)
  console.log(`\nVisit 👉 ${url} 👈 ASAP!\n`)

  return await Promise.all([
    desktop && sendDesktopAlert(pharmacy, url),
    emailAndSMS && sendEmailAndSMS(pharmacy, url),
  ])
}

export default notify
