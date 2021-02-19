// TODO: add SDK calls for some remote logging service
// while keeping the `console.log` stuff for local development

const log = (...args) => console.log.apply(console, args)

const error = (message, err) => console.error(`💥 ${message}`, err)

export default {
  log,
  error
}
