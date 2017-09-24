class MayoLog {
  constructor(startTime) {
    this.startTime = startTime
    this.mayolog = []

    this.log = this.log.bind(this)
    this.toConsole = this.toConsole.bind(this)
  }

  log(log, data) {
    const time = new Date() - this.startTime

    this.mayolog.push({
      time,
      log,
      data,
    })
  }

  toConsole() {
    return this.mayolog.map(({ time, log, data }) => {
      const logOutput = `(${time}ms) ${log} ${JSON.stringify(data)}`
      console.log(logOutput)
      return logOutput
    });
  }

  findWithDataAttribute(key) {
    
  }

  sendToServer(url) {

  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startTime = new Date();
  MayoLog = new MayoLog(startTime);
});
