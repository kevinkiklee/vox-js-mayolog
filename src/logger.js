/* eslint-disable no-console */
import chancify from 'chancify'
import hasKey from './util/hasKey'
import makeXHR from './util/makeXHR'

class Logger {
  constructor() {
    this.startTime = new Date()
    this.logEntries = []
  }

  log(log = 'Unknown entry', data) {
    const time = new Date() - this.startTime
    const logEntry = { time, log, data }

    return this.logEntries.push(logEntry)
  }

  toConsole(logEntries = this.logEntries) {
    return this.printToConsole('=-=-=-=-= Logger! =-=-=-=-=', logEntries)
  }

  findWithDataAttribute(key) {
    const filteredLogEntries = this.logEntries.filter(({ data }) => hasKey(data, key))

    this.printToConsole('=-=-=- Search Result -=-=-=', filteredLogEntries)
    return filteredLogEntries
  }

  sendToServer(url) {
    const sendLog = chancify(makeXHR, 0.5)
    const options = {
      type: 'POST',
      url,
      data: this.logEntries,
      success: () => this.printHeading('=-=-=- Log Submitted -=-=-=', 'lightgreen'),
      error: () => this.printHeading('=-=-=- Submit Failed -=-=-=', 'red'),
    }

    sendLog(options)
  }

  printToConsole(heading, logEntries) {
    const parsedLogEntries = this.parseLogEntries(logEntries)

    this.printHeading(heading)
    this.printLogEntries(parsedLogEntries)

    return parsedLogEntries
  }

  parseLogEntries(logEntries) {
    return logEntries.map(({ time, log, data }, index) =>
      `[${index + 1}] (${time}ms) ${log} ${JSON.stringify(data)}`)
  }

  printHeading(text, color = 'cyan') {
    console.log(`%c${text}`, `color: ${color}`)
  }

  printLogEntries(parsedLogEntries) {
    parsedLogEntries.forEach(logEntry => console.log(logEntry))
  }
}

export default Logger
