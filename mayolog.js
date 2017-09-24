class MayoLog {
  constructor(startTime) {
    this.startTime = startTime
    this.mayolog = []

    this.log = this.log.bind(this)
    this.toConsole = this.toConsole.bind(this)
  }

  log(log, data) {
    const time = new Date() - this.startTime
    this.mayolog.push({ time, log, data })
  }

  toConsole() {
    const logOutput = this.mayolog.map(({ time, log, data }, index) => 
      `[${index + 1}] (${time}ms) ${log} ${JSON.stringify(data)}`
    )

    this._printToConsole(logOutput)
    return logOutput
  }

  findWithDataAttribute(key) {
    const found = []

    this.mayolog.forEach(logEntry => {
      if (this._deepSearch(logEntry.data, key)) {
        found.push(logEntry)
      }
    })

    return found
  }

  sendToServer(url) {

  }

  _printToConsole(log) {
    console.log('%c=-=-=-=-= maYOLOg =-=-=-=-=', 'color: cyan')
    log.forEach(line => console.log(line))
  }

  _deepSearch(object, key) {
    
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startTime = new Date();
  MayoLog = new MayoLog(startTime);
});
