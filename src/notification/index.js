import sendDesktopAlert from './desktop.js'
import sendEmailAndSMS from './email.js'

/*
 * Sends notifications to all recipients.
 * param {String} pharmacy
 * param {String} url
 * returns Promise<Array> - resolution array is not meant to be used
*/
const notify = async (pharmacy, url) => {
  console.log(`✅ OMG ${pharmacy} has an appointment available!`)
  console.log(`Visit 👉 ${url} 👈 ASAP!`)

  await Promise.all([
    sendDesktopAlert(pharmacy, url),
    sendEmailAndSMS(pharmacy, url),
  ])
}

export default notify
