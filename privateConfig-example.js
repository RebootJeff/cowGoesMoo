// Enable/disable certain types of notifications
export const ENABLE_NOTIFICATION = Object.freeze({
  desktop: true,
  emailAndSMS: false,
})

export const SENDER = Object.freeze({
  address: 'you@gmail.com',

  // Most free services have a limit to prevent you from spamming others
  dailyLimit: 0, // Use 0 to remove any limitations

  name: 'Your name here', // Use your full name if you want your recipient to recognize you
  password: 'bestPasswordEverObviously',
  
  // Supported services: https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  service: 'Gmail', // If you want to use Gmail, you may need to change some Gmail Account settings: https://nodemailer.com/usage/using-gmail/
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

export const SEARCH = Object.freeze({
  cities: [ // used for Vaccine Spotter and CVS (make sure each city has a CVS location)
    'San Francisco, CA',
  ],
  zipCode: '94102', // used for Walgreens (they use 25-mile radius)
})

export const LOOP_INTERVAL = 5 // minutes

export const HIDE_BROWSER = true
export const BROWSER_SIZE = Object.freeze({
  height: 768,
  width: 1024,
})
