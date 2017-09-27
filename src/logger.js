/* eslint-disable no-console */
import hasKey from './hasKeyUtil'

class Logger {
  constructor() {
    this.startTime = new Date()
    this.mayolog = []
  }

  log(log, data) {
    const time = new Date() - this.startTime
    this.mayolog.push({ time, log, data })
  }

  toConsole(log = this.mayolog, isSearch = false) {
    const logOutput = this.buildLogOutput(log)
    this.printToConsole(logOutput, isSearch)
    return logOutput
  }

  findWithDataAttribute(key) {
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
    const transmitLog = () => {
      console.log(url);
    }

    const sendLog = this.chancify(transmitLog, 0.5)
    sendLog()
  }

  buildLogOutput(rawLog) {
    return rawLog.map(({ time, log, data }, index) =>
      `[${index + 1}] (${time}ms) ${log} ${JSON.stringify(data)}`)
  }

  printToConsole(log, isSearch) {
    if (isSearch) {
      console.log('%c=-=-=- Search Result -=-=-=', 'color: cyan')
    } else {
      console.log('%c=-=-=-=-= maYOLOg =-=-=-=-=', 'color: cyan')
    }

    log.forEach(line => console.log(line))
  }

  chancify(fn, percentChance) {
    const chancified = (...args) => {
      const shouldRunFn = Math.random() <= percentChance

      if (shouldRunFn) {
        fn(...args)
      }
    }

    return chancified
  }
}

export default Logger
