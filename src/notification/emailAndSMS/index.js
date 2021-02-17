import nodemailer from 'nodemailer'

import getMessageFields from './message.js'
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
    return console.log('🙊 Email/SMS notification cannot be sent!')
  }

  console.log(`📧 Sending email/SMS to ${recipient.address}...`)

  await transporter.sendMail({
    from: SENDER.address,
    to: recipient.address,
    ...(getMessageFields(SENDER, recipient, pharmacy, url))
  })

  console.log(`👍 Email/SMS sent to ${recipient.name}.`)
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

  for(const recipient of RECIPIENTS) {
    try {
      await sendMessage(transporter, recipient, pharmacy, url)
    } catch (err) {
      console.error(`💥 Failed to send email/SMS about ${pharmacy} to ${recipient}:`, err)
    }
  }
}

export default notify
