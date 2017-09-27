/* eslint-disable no-console */
import chancify from 'chancify'
import hasKey from './util/hasKey'
import makeXHR from './util/makeXHR'

class Logger {
  constructor() {
    this.startTime = new Date()
    this.logEntries = []
  }

  log(log = 'Unknown entry', data = {}) {
    const time = new Date() - this.startTime
    this.logEntries.push({ time, log, data })
  }

  toConsole(logEntries = this.logEntries, isSearch = false) {
    const logOutput = this.buildLogOutput(logEntries)
    this.printToConsole(logOutput, isSearch)
    return logOutput
  }

  findWithDataAttribute(key = '') {
    const logEntries = []

    this.logEntries.forEach(logEntry => {
      if (hasKey(logEntry.data, key)) {
        logEntries.push(logEntry)
      }
    })

    this.toConsole(logEntries, true)
    return logEntries
  }

  sendToServer(url) {
    const sendLog = chancify(makeXHR, 0.5)

    const params = {
      type: 'POST',
      url,
      data: this.logEntries,
      callback: () => this.colorPrint('=-=-=- Log Submitted -=-=-=', 'lightgreen'),
    }

    sendLog(params)
  }

  buildLogOutput(logEntries = []) {
    return logEntries.map(({ time, log, data }, index) =>
      `[${index + 1}] (${time}ms) ${log} ${JSON.stringify(data)}`)
  }

  printToConsole(logOutput = [], isSearch = false) {
    if (isSearch) {
      this.colorPrint('=-=-=- Search Result -=-=-=')
    } else {
      this.colorPrint('=-=-=-=-= Logger! =-=-=-=-=')
    }

    logOutput.forEach(line => console.log(line))
  }

  colorPrint(text = '', color = 'cyan') {
    console.log(`%c${text}`, `color: ${color}`)
  }
}

export default Logger
