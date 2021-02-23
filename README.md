# CowGoesMoo 🐮💬💉

This software will scan for COVID vaccine appointments at supported pharmacies. The current list of supported pharmacies is [here](https://github.com/RebootJeff/cowGoesMoo/blob/main/src/sites/index.js#L4). Upon finding a potential open appointment, the app will notify you via desktop notification, email, and/or SMS (depending on how you've configured it).

Sadly, this initial version of the app only supports usage in USA. Specifically, SMS notifications and location configuration are both designed for USA users.

If you'd like to see what the app is doing, then configure it to show its browser window. Then you'll see something like this:
![demonstration](https://user-images.githubusercontent.com/4919808/108439222-b1e65f80-7205-11eb-9e62-bfbc8c196156.gif)

## Getting Started

In this initial version, the app must run locally.

1. Install Node.js v14. Clone this repo to your computer. Navigate your terminal to your local copy of this repo.
1. Run `npm i` in a terminal to install dependencies.
1. Rename the `privateConfig-example.js` file to just "privateConfig.js".
1. Edit the contents of `privateConfig.js` file with your own location and contact info.
1. Run `npm start` in a terminal to start scanning.

By default, the program will only show desktop notifications and print helpful logs in the terminal. You can edit the `privateConfig.js` file to also send notifications via a combo of email and SMS.

## More Info

Visit [the wiki](https://github.com/RebootJeff/cowGoesMoo/wiki) for more background info, docs, etc!
