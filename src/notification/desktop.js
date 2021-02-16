import notifier from 'node-notifier'

/*
 * Opens desktop notification pop-up/toast thingy
 * param {String} pharmacy
 * param {String} url
 * returns Promise<void> - resolution value is not meant to be used
*/
const sendDesktopAlert = (pharmacy, url) => new Promise((resolve, reject) => {
  notifier.notify({
    title: `🐮💬💉 ${pharmacy} has a COVID vaccine appointment!`,
    message: 'Click to open the website',
    open: url,
    sound: true,
    wait: true,
  }, (err, response, metadata) => {
    if (err) {
      reject(err)
    }
    resolve([response, metadata])
  })
})

export default sendDesktopAlert
