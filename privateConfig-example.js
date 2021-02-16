export const emailFrom = Object.freeze({
  address: 'you@gmail.com',
  name: 'Jeff',
  password: 'bestPasswordEverObviously',
  service: 'Gmail', // Supported services: https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  // If you want to use Gmail, you may need to change some Gmail Account settings: https://nodemailer.com/usage/using-gmail/
})

export const emailTo = Object.freeze({
  address: 'mom@gmail.com',
  name: 'Mom',
})

export const search = Object.freeze({
  state: 'CA',
  zipCode: '90210',
})

export const timeBetweenChecks = 5 // minutes
