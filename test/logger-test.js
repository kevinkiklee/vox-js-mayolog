import test from 'tape'
import Logger from '../src/logger'

const Log = new Logger()
const startTime = new Date()

const logA = {
  log: 'Log - A',
  data: {
    key: 'value',
    keyA: 'value',
  },
}

const logB = {
  log: 'Log - B',
  data: {
    key: 'value',
    keyB: 'value',
    nestedObject: {
      nestedKey: 'nestedValue',
      deepNestedObject: {
        deepNestedKey: 'deepNestedValue',
      },
    },
  },
}

Log.log(logA.log, logA.data)
Log.log(logB.log, logB.data)

test('MayoLog is instantiated', t => {
  t.isEqual(typeof Log, 'object')
  t.end()
})

test('Records the start time', t => {
  t.isEqual(startTime.toString(), Log.startTime.toString())
  t.end()
})

test('Outputs to console', t => {
  t.end()
})

test('Returns a log object', t => {
  const actualOutput = Log.toConsole()
  t.isEqual(actualOutput.length, 2)
  t.end()
})

test('Finds the key in an object', t => {
  const found = Log.findWithDataAttribute('keyA')
  t.isEqual(found.length, 1)
  t.isEqual(found[0].log, 'Log - A')
  t.end()
})

test('Finds all entries with the key', t => {
  const found = Log.findWithDataAttribute('key')
  t.isEqual(found.length, 2)
  t.end()
})

test('Finds the nested key in an object', t => {
  const found = Log.findWithDataAttribute('nestedKey')
  t.isEqual(found.length, 1)
  t.isEqual(found[0].log, 'Log - B')
  t.end()
})

test('Finds deeply nested key in an object', t => {
  const found = Log.findWithDataAttribute('deepNestedKey')
  t.isEqual(found.length, 1)
  t.isEqual(found[0].log, 'Log - B')
  t.end()
})
