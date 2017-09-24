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
    console.log(this.mayolog);
    return this.mayolog
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
