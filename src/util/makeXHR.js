/* eslint-disable no-undef */

// makeXHR() accepts an optiosns object and makes an HTTP request.
const makeXHR = (options = {}) => {
  const defaults = {
    type: 'GET',
    url: 'http://httbin.org/get',
    data: {},
    success: () => {},
    error: () => {},
  }

  const {
    type,
    url,
    data,
    success,
    error,
  } = { ...defaults, ...options }

  const xhr = new XMLHttpRequest()
  xhr.open(type, url, true)

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        success()
      } else {
        error()
      }
    }
  }

  xhr.send(JSON.stringify(data))
}

export default makeXHR
