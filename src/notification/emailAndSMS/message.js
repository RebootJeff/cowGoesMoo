const EMAIL_SIGNATURE = '<p>' +
  'BTW, I generated this email notification automatically by using ' +
  '<a href="https://github.com/RebootJeff/cowGoesMoo">CowGoesMoo</a> 🐮💬💉' +
  '</p>'

const getHtml = (recipientName, senderName, url) => '<p style="font-size: large;">' +
  `${recipientName}, go to <b><a href="${url}">${url}</a></b> ASAP!` +
  '<br/><br/>' +
  `Let me know how it goes,<br/>${senderName}` +
  '</p>' +
  EMAIL_SIGNATURE

// SMS message length is limited ~160 characters. Some URLs can be very long,
// so we should keep the message as short as possible to leave space for the URL.
const getText = (senderName, url) =>
  `Visit ${url} for COVID vaccine apptmnts. Check w/${senderName} if u think this is spam`

/*
 * param {Object} sender
 * param {Object} recipient
 * param {String} pharmacy
 * param {String} url
 * returns {Object} - text/html key-value pair
*/
const getMessageFields = (sender, recipient, pharmacy, url) => {
  const phoneNumberString = recipient.address.split('@')[0]
  if (
    (
      phoneNumberString.length === 10 ||
      (phoneNumberString[0] === '1' && phoneNumberString.length === 11)
    ) &&
    isNaN(Number(phoneNumberString)) === false
  ) {
    return { text: getText(sender.name, url) }
  }

  return {
    subject: `💉 ${pharmacy} has a COVID vaccine appointment available!`,
    html: getHtml(recipient.name, sender.name, url),
  }
}

export default getMessageFields
