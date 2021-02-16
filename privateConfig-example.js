export const SENDER = Object.freeze({
  address: 'you@gmail.com',
  name: 'Jeff',
  password: 'bestPasswordEverObviously',
  service: 'Gmail', // Supported services: https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  // If you want to use Gmail, you may need to change some Gmail Account settings: https://nodemailer.com/usage/using-gmail/
})

export const RECIPIENTS = Object.freeze([
  Object.freeze({
    address: 'mom@gmail.com',
    name: 'Mom',
  }),
  Object.freeze({
    // SMS notification is supported by using a phone number + carrier domain.
    // See here for domains: https://github.com/jef/streetmerchant/blob/edb39f8f05451c3cc1994c0beb2338bae04ab585/src/config.ts#L270-L285
    address: '1234567890@txt.att.net',
    name: 'Mom',
  }),
])

export const search = Object.freeze({
  state: 'CA',
  zipCode: '90210',
})

export const timeBetweenChecks = 5 // minutes
