import nodemailer from 'nodemailer'

import { SENDER, RECIPIENTS } from '../privateConfig.js'

/*
 * Checks that the config file contains all the necessary email fields.
 * returns Boolean
*/
const validateConfig = () => {
  try {
    return SENDER.address &&
      SENDER.name &&
      SENDER.password &&
      SENDER.service &&
      RECIPIENTS[0].address &&
      RECIPIENTS[0].name
  } catch (err) {
    console.error('💥 privateConfig.js is missing email info:', err)
    return false
  }
}

/*
 * Sends notification to an individual.
 * param {Nodemailer Transporter} transporter
 * param {Object} recipient
 * param {String} pharmacy
 * param {String} url
 * returns Promise<void> - resolution value is not meant to be used
*/
const sendMessage = async (transporter, recipient, pharmacy, url) => {
  console.log(`📧 Sending email to ${recipient.address}...`)
      
  await transporter.sendMail({
    from: SENDER.address,
    to: recipient.address,
    subject: `💉 ${pharmacy} has a COVID vaccine appointment available!`,
    text: `Hi ${recipient.name} - Visit ${url} ASAP!`
  })

  console.log(`👍 Email sent to ${recipient.name}.`)
}

/*
 * Sends notifications to all recipients.
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
    service: 'Hotmail',
    auth: {
      user: SENDER.address,
      pass: SENDER.password,
    },
  })

  try {
    for(const recipient of RECIPIENTS) {
      await sendMessage(transporter, recipient, pharmacy, url)
    }
  } catch (err) {
    console.error(`💥 Failed to send email for ${pharmacy}:`, err)
  }
}

export default notify
