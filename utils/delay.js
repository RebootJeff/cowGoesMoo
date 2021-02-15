/*
 * Provides a promise-based setTimeout
 * returns Promise<Boolean> - appointment availability
*/
const delay = async (callback, interval, ...params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      callback.apply(null, params)
        .then(resolve)
        .catch(reject)
    }, interval)
  })
}

export default delay
