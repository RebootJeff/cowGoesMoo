import notifier from 'node-notifier'

/*
 * Opens desktop notification pop-up/toast thingy
 * param {String} pharmacy
 * param {String} url
 * returns Promise<void> - resolution value is not meant to be used
*/
const sendDesktopAlert = (pharmacy, url) => new Promise((resolve, reject) => {
  console.log('url:', url)
  notifier.notify({
    title: `🐮💬💉 ${pharmacy} has a COVID vaccine appointment!`,
    subtitle: 'brought to you by CowGoesMoo',
    message: 'Click to open the website if on MacOS. Or see terminal for the URL.',
    open: url, // only works on MacOS
    sound: true,
    wait: true,
  }, (err, response, metadata) => {
    if (err) {
      console.error(`💥 Error sending desktop alert for ${pharmacy}:`, err)
      reject(err)
    }
    resolve([response, metadata])
  })
})

export default sendDesktopAlert
