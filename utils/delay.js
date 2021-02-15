const delay = async (callback, interval, ...params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback.apply(null, params)
        .then(resolve)
    }, interval)
  })
}

export default delay