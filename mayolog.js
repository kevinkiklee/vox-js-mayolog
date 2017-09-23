class MayoLog {
  constructor(startTime) {
    console.log('???', startTime);
  }

  log(log, data) {
    console.log('===', log);
    console.log('!!!', data);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startTime = new Date();
  MayoLog = new MayoLog(startTime);
});
