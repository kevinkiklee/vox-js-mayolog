/* eslint-disable no-console */
import chancify from 'chancify'
import hasKey from './util/hasKey'
import makeXHR from './util/makeXHR'
import { printToConsole, printHeading } from './util/printToConsole'

class Logger {
  constructor() {
    this.startTime = new Date()
    this.logEntries = []
  }

  log(event, data) {
    const time = new Date() - this.startTime
    const logEntry = { time, event, data }

    return this.logEntries.push(logEntry)
  }

  toConsole(logEntries = this.logEntries) {
    return printToConsole('=-=-= Logger! =-=-=', logEntries)
  }

  findWithDataAttribute(key) {
    const logEntryHasKey = ({ data }) => hasKey(data, key)
    const filteredLogEntries = this.logEntries.filter(logEntryHasKey)

    printToConsole('== Search Result ==', filteredLogEntries)
    return filteredLogEntries
  }

  sendToServer(url) {
    const sendLogEntries = chancify(makeXHR, 0.5)
    const options = {
      type: 'POST',
      url,
      data: this.logEntries,
      success: () => printHeading('== Log Submitted ==', 'lightgreen'),
      error: () => printHeading('== Submit Failed ==', 'red'),
    }

    sendLogEntries(options)
  }
}

export default Logger
