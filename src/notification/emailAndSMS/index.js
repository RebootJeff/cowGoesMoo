import nodemailer from 'nodemailer'

import getMessageFields from './message.js'
import validateConfig from './validateConfig.js'
import { sendBadConfigAlert } from '../desktop.js'
import logger from '../../utils/logger.js'
import { SENDER, RECIPIENTS } from '../../../privateConfig.js'

// Used for limiting outgoing emails
let lastSent = 0 // milliseconds UNIX epoch

/*
 * Sends notification to an individual.
 * param {Int} dailyLimit - number of emails that can be sent per day
 * param {Int} numRecipients - number of recipients (num of emails to be sent at a time)
 * returns Promise<void> - resolution value is not meant to be used
*/
const getNextSendTime = (dailyLimit, numRecipients) => {
  const TIME_PER_DAY = 24 * 60 * 60 * 1000 // milliseconds
  const timeBetweenSends = Math.ceil(TIME_PER_DAY / dailyLimit * numRecipients)
  return lastSent + timeBetweenSends
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
  if (validateConfig(SENDER, recipient) === false) {
    logger.log('🛑 Cannot send email/SMS: Sender or recipient info is improperly configured.')
    return await sendBadConfigAlert('Check your sender/recipient config.')
  }

  logger.log(`📧 Sending email/SMS to ${recipient.address}...`)

  await transporter.sendMail({
    from: SENDER.address,
    to: recipient.address,
    ...(getMessageFields(SENDER, recipient, pharmacy, url))
  })

  lastSent = Date.now()

  logger.log(`👍 Email/SMS sent to ${recipient.name}.`)
}

/*
 * Sends notifications to all recipients.
 * param {String} pharmacy
 * param {String} url
 * returns Promise<void> - resolution value is not meant to be used
*/
const notify = async (pharmacy, url) => {
  const numRecipients = RECIPIENTS.length
  if (Array.isArray(RECIPIENTS) === false || numRecipients < 1) {
    logger.log('🛑 Cannot send email/SMS: There are no recipients configured. 😑')
    return await sendBadConfigAlert('Add recipients to the config.')
  }

  const { dailyLimit } = SENDER
  if (dailyLimit > 0) {
    if (dailyLimit < numRecipients) {
      logger.log('🛑 Cannot send email/SMS: Why does your config have a dailyLimit below the number of recipients? 😑')
      return await sendBadConfigAlert('dailyLimit must be > number of recipients.')
    }

    // Throttle email notification if necessary
    const nextSendTime = getNextSendTime(dailyLimit, numRecipients)
    if (nextSendTime > Date.now()) {
      logger.log(`⏸  Email/SMS notifications disabled until
        ${new Date(nextSendTime)} to prevent hitting the daily limit.`)
      return
    }
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
      logger.error(`💥 Failed to send email/SMS about ${pharmacy} to ${recipient}:`, err)
    }
  }
}

export default notify
