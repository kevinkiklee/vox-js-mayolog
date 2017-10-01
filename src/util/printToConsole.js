/* eslint-disable no-console */
const parseLogEntries = logEntries => (
  logEntries.map(({ time, log, data }, index) =>
    `[${index + 1}] (${time}ms) ${log} ${JSON.stringify(data)}`)
)

const printHeading = (text, color = 'cyan') => {
  console.log(`%c${text}`, `color: ${color}`)
}

const printLogEntries = parsedLogEntries => {
  parsedLogEntries.forEach(logEntry => console.log(logEntry))
}

const printToConsole = (heading, logEntries) => {
  const parsedLogEntries = parseLogEntries(logEntries)

  printHeading(heading)
  printLogEntries(parsedLogEntries)

  return parsedLogEntries
}

export {
  printToConsole,
  printHeading,
}
