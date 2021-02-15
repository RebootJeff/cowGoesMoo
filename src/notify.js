// TODO: Add email notification similar to https://github.com/jef/streetmerchant/blob/main/src/notification/email.ts
const notify = (name, url) => {
  console.log(`✅ OMG ${name} has an appointment available!`)
  console.log(`Visit 👉 ${url} 👈 ASAP!`)
}

export default notify
