# CowGoesMoo 🐮💬💉💉💉

This software will scan for COVID vaccine appointments at supported pharmacies. The current list of supported pharmacies is [here](https://github.com/RebootJeff/cowGoesMoo/blob/main/src/sites/index.js#L4). Upon finding a potential open appointment, the app will notify you via desktop notification, email, and/or SMS (depending on how you've configured it).

Sadly, this initial version of the app only supports usage in USA. Specifically, SMS notifications and location configuration are both designed for USA users.

## Context

- Pharmacies like CVS and Walgreens don't have a wait list or queue system for the COVID vaccine. I don't want my mom to have to deal with constantly refreshing the pharmacy websites to check for open appointments.
- I plan on running this app on my local machine. If it finds an open vaccination appointment, it will send a notification email.
- As you can imagine, the pharmacies don't provide open APIs to query for appointment availability status. So this app relies on web crawling rather than direct API calls.
- Technically, instead of looking for open appointments, the app looks for a lack of open appointments. I've never seen appointment availability, so I can't program the app to recognize availability. If it can't find a total lack of appointments, then yay!
- Cow ➡ vaccine. Goes Moo ➡ notifications.

## Getting Started

In this initial version, the app must run locally.

1. Install Node.js v14
1. Run `npm i` in a terminal to install dependencies.
1. Rename the `privateConfig-example.js` file to just "privateConfig.js".
1. Edit the contents of `privateConfig.js` file with your own personal info.
1. Run `npm start` in a terminal to start the scanner.

By default, the program will only show desktop notifications and print helpful logs in the terminal. You can edit the `privateConfig.js` file to also send notifications via a combo of email and SMS.

## Development Info

- The [streetmerchant](https://github.com/jef/streetmerchant) repo is a stellar reference!
- Certain comments are added to help those who might be learning to code by reading my source code.
- Key open-source tools used:
  - *Google Puppeteer* for headless browsing.
  - *Nodemailer* for email & SMS notifications.
  - *node-notifier* for desktop notifications.
