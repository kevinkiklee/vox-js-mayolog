/* eslint-disable no-console */

// Logger contains only the public functions.
// All private methods have been abstracted into modules
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
    // logEntryHasKey() is a function for filtering that uses
    // the imported hasKey() that returns a boolean
    const logEntryHasKey = ({ data }) => hasKey(data, key)
    const filteredLogEntries = this.logEntries.filter(logEntryHasKey)

    printToConsole('== Search Result ==', filteredLogEntries)
    return filteredLogEntries
  }

  sendToServer(url) {
    // Returns a function based on the probabibility specified
    const sendLogEntries = chancify(makeXHR, 0.5)
    const options = {
      type: 'POST',
      url,
      data: this.logEntries,
      success: () => printHeading('== Log Submitted ==', 'green'),
      error: () => printHeading('== Submit Failed ==', 'red'),
    }

    sendLogEntries(options)
  }
}

export default Logger
