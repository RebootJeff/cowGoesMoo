# CowGoesMoo 🐮💬💉💉💉

This software will scan for COVID vaccine appointments at supported pharmacies. The current list of supported pharmacies is [here](https://github.com/RebootJeff/cowGoesMoo/blob/main/src/sites/index.js#L4).

## Context

- Pharmacies like CVS and Walgreens don't have a wait list or queue system for the COVID vaccine. I don't want my mom to have to deal with constantly refreshing the pharmacy websites to check for open appointments.
- I plan on running this app on my local machine. If it finds an open vaccination appointment, it will send a notification email.
- As you can imagine, the pharmacies don't provide open APIs to query for appointment availability status. So this app relies on web crawling rather than direct API calls.

## Getting Started

1. Install Node.js v14
1. Run `npm i` in a terminal to install dependencies.
1. Rename the `privateConfig-example.js` file to just "privateConfig.js".
1. Edit the contents of `privateConfig.js` file with your own personal info.
1. Run `npm start` in a terminal to start the scanner.

## Development Info

- The [streetmerchant](https://github.com/jef/streetmerchant) repo is a stellar reference!
- Certain comments are added to help readers who might be learning to code.
- Key 3rd party tools:
-- Google Puppeteer for headless browsing
-- ??? for emailing notifications
