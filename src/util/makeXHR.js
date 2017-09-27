/* eslint-disable no-undef, no-console */
const makeXHR = (params = {}) => {
  const defaults = {
    type: 'GET',
    url: 'http://httbin.org/get',
    data: {},
    callback: () => {},
  }

  const {
    type,
    url,
    data,
    callback,
  } = Object.assign({}, defaults, params)

  const xhr = new XMLHttpRequest()
  xhr.open(type, url, true)

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback()
    }
  }

  xhr.send(JSON.stringify(data))
}

export default makeXHR
