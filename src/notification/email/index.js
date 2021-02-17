import nodemailer from 'nodemailer'

import getMessageField from './message.js'
import validateConfig from './validateConfig.js'
import { SENDER, RECIPIENTS } from '../../../privateConfig.js'

/*
 * Sends notification to an individual.
 * param {Nodemailer Transporter} transporter
 * param {Object} recipient
 * param {String} pharmacy
 * param {String} url
 * returns Promise<void> - resolution value is not meant to be used
*/
const sendMessage = async (transporter, recipient, pharmacy, url) => {
  if (validateConfig(SENDER, recipient) === false) {
    return console.log('🙊 Email notification cannot be sent!')
  }

  console.log(`📧 Sending email to ${recipient.address}...`)

  await transporter.sendMail({
    from: SENDER.address,
    to: recipient.address,
    subject: `💉 ${pharmacy} has a COVID vaccine appointment available!`,
    ...(getMessageField(recipient, SENDER, url))
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
  if (Array.isArray(RECIPIENTS) === false) {
    console.log('🤷‍♂️ There are no recipients configured.')
  }

  const transporter = nodemailer.createTransport({
    service: SENDER.service,
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
