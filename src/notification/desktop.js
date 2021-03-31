import notifier from 'node-notifier'

import logger from '../utils/logger.js'

// Promisified wrapper for node-notifier
const notifyDesktop = input => new Promise((resolve, reject) => {
  notifier.notify(input, (err, response, metadata) => {
    if (err) {
      reject(err)
    }
    resolve([response, metadata])
  })
})

/*
 * Opens desktop notification pop-up/toast thingy
 * param {String} message
 * returns Promise<void> - resolution value is not meant to be used
*/
export const sendBadConfigAlert = async (message) => {
  try {
    return await notifyDesktop({
      title: '💩 There is something wrong with your config!',
      subtitle: 'brought to you by CowGoesMoo',
      message,
      sound: true,
      wait: true,
    })
  } catch (err) {
    logger.error('💥 Error sending desktop alert about bad config', err)
  }
}

/*
 * Opens desktop notification pop-up/toast thingy
 * param {String} pharmacy
 * param {String} url
 * returns Promise<void> - resolution value is not meant to be used
*/
const sendDesktopAlert = async (pharmacy, url) => {
  try {
    return await notifyDesktop({
      title: `🐮💬💉 ${pharmacy} has a COVID vaccine appointment!`,
      subtitle: 'brought to you by CowGoesMoo',
      message: 'Click to open the website if on MacOS. Or see terminal for the URL.',
      open: url, // only works on MacOS
      sound: true,
      wait: true,
    })
  } catch (err) {
    logger.error(`Error sending desktop alert for ${pharmacy}:`, err)
  }
}

export default sendDesktopAlert
