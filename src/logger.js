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
    const logOutput = this._buildLogOutput(log)
    this._printToConsole(logOutput, isSearch)
    return logOutput
  }

  findWithDataAttribute(key) {
    const foundEntries = []

    this.mayolog.forEach(logEntry => {
      if (this._hasKey(logEntry.data, key)) {
        foundEntries.push(logEntry)
      }
    })

    this.toConsole(foundEntries, true)
    return foundEntries
  }

  sendToServer(url) {
    const _sendLog = () => {
      console.log(url);
    }

    const sendLog = this._chancify(_sendLog, .5)
    sendLog()
  }

  _buildLogOutput(log) {
    return log.map(({ time, log, data }, index) => 
      `[${index + 1}] (${time}ms) ${log} ${JSON.stringify(data)}`
    )
  }

  _printToConsole(log, isSearch) {
    if (isSearch) {
      console.log('%c=-=-=- Search Result -=-=-=', 'color: cyan')
    } else {
      console.log('%c=-=-=-=-= maYOLOg =-=-=-=-=', 'color: cyan')
    }

    log.forEach(line => console.log(line))
  }

  _hasKey(object, key) {
    if (object.length === 0) {
      return false
    }

    const keys = Object.keys(object)
    
    if (keys.includes(key)) {
      return true
    } else {
      const children = []

      keys.forEach(key => {
        if (typeof object[key] === 'object') {
          children.push(object[key])
        }
      })

      for (const child of children) {
        return this._hasKey(child, key)
      }
    }
    
    return false
  }

  _chancify(fn, percentChance) {
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
