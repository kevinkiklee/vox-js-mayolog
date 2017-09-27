/* eslint-disable no-undef, no-console */
const sendLog = (url, log) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log('TRANSMITTED!!!')
    }
  }

  xhr.send(JSON.stringify(log))
}

export default sendLog
