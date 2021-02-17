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

const getText = (recipientName, senderName, url) =>
  `Hey ${recipientName}, this is ${senderName}. Visit ${url}` +
  'because it might have open COVID vaccine appointments! 🤞' +
  '(BTW, I used CowGoesMoo to generate this notification)'

/*
 * param {Object} recipient
 * param {Object} sender
 * param {String} url
 * returns {Object} - text/html key-value pair
*/
const getMessageField = (recipient, sender, url) => {
  const phoneNumberString = recipient.address.split('@')[0]
  if (
    (
      phoneNumberString.length === 10 ||
      (phoneNumberString[0] === '1' && phoneNumberString.length === 11)
    ) &&
    isNaN(Number(phoneNumberString)) === false
  ) {
    return { text: getText(recipient.name, sender.name, url) }
  }

  return { html: getHtml(recipient.name, sender.name, url) }
}

export default getMessageField
