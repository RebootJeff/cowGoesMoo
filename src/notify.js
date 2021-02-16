import nodemailer from 'nodemailer'

import { emailFrom, emailTo } from '../privateConfig.js'

/*
 * Checks that the config file contains all the necessary email fields.
 * returns Boolean
*/
const validateConfig = () => {
  try {
    return emailFrom.address &&
      emailFrom.name &&
      emailFrom.password &&
      emailTo.address &&
      emailTo.name
  } catch (err) {
    console.error('💥 privateConfig.js is missing email info:', err)
    return false
  }
}

/*
 * Sends notification email via Gmail.
 * param {String} pharmacy
 * param {String} url
 * returns Promise<void> - resolution value is not meant to be used
*/
const notify = async (pharmacy, url) => {
  console.log(`✅ OMG ${pharmacy} has an appointment available!`)
  console.log(`Visit 👉 ${url} 👈 ASAP!`)

  if (validateConfig() === false) {
    return console.log('🙊 Email notification cannot be sent!')
  }

  const transporter = nodemailer.createTransport({
    // TODO: Consider switching off of Gmail - https://nodemailer.com/usage/using-gmail/
    service: 'Hotmail',
    auth: {
      user: emailFrom.address,
      pass: emailFrom.password,
    },
  })

  try {
    console.log(`📧 Sending email to ${emailTo.address}...`)

    await transporter.sendMail({
      from: emailFrom.address,
      to: [emailTo.address, '4432859770@vtext.com'],
      subject: `💉 ${pharmacy} has a COVID vaccine appointment available!`,
      text: `Hi ${emailTo.name} - Visit ${url} ASAP!`
    })

    console.log(`👍 Email sent to ${emailTo.name}.`)
  } catch (err) {
    console.error(`💥 Failed to send email for ${pharmacy}:`, err)
  }
}

export default notify
