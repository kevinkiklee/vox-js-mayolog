/* eslint-disable no-console */
import chancify from 'chancify'
import hasKey from './util/hasKey'
import makeXHR from './util/makeXHR'

class Logger {
  constructor() {
    this.startTime = new Date()
    this.mayolog = []
  }

  log(log = 'Unknown action', data = {}) {
    const time = new Date() - this.startTime
    this.mayolog.push({ time, log, data })
  }

  toConsole(log = this.mayolog, isSearch = false) {
    const logOutput = this.buildLogOutput(log)
    this.printToConsole(logOutput, isSearch)
    return logOutput
  }

  findWithDataAttribute(key = '') {
    const foundEntries = []

    this.mayolog.forEach(logEntry => {
      if (hasKey(logEntry.data, key)) {
        foundEntries.push(logEntry)
      }
    })

    this.toConsole(foundEntries, true)
    return foundEntries
  }

  sendToServer(url) {
    const sendLog = chancify(makeXHR, 0.5)

    const params = {
      type: 'POST',
      url,
      data: this.mayolog,
      callback: () => this.colorPrint('=-=-=- Log Submitted -=-=-=', 'lightgreen'),
    }

    sendLog(params)
  }

  buildLogOutput(rawLog) {
    return rawLog.map(({ time, log, data }, index) =>
      `[${index + 1}] (${time}ms) ${log} ${JSON.stringify(data)}`)
  }

  printToConsole(log, isSearch) {
    if (isSearch) {
      this.colorPrint('=-=-=- Search Result -=-=-=')
    } else {
      this.colorPrint('=-=-=-=-= maYOLOg =-=-=-=-=')
    }

    log.forEach(line => console.log(line))
  }

  colorPrint(text = '', color = 'cyan') {
    console.log(`%c${text}`, `color: ${color}`)
  }
}

export default Logger
