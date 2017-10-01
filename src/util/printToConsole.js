/* eslint-disable no-console */
const parseLogEntries = logEntries => (
  logEntries.map(({ time, event, data }, index) =>
    `[${index + 1}] (${time}ms) ${event} ${JSON.stringify(data)}`)
)

const printHeading = (text, color = 'blue') => {
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
