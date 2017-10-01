/* eslint-disable no-console */
import test from 'tape'
import Logger from '../src/logger'

const Log = new Logger()
const startTime = new Date()

const logA = {
  event: 'Log - A',
  data: {
    key: 'value',
    keyA: 'value',
  },
}

const logB = {
  event: 'Log - B',
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

test('Logger object is instantiated', t => {
  t.isEqual(typeof Log, 'object')
  t.end()
})

test('Logger object records the start time', t => {
  t.isEqual(startTime.toString(), Log.startTime.toString())
  t.end()
})

test('log() records the entry', t => {
  Log.log(logA.event, logA.data)
  Log.log(logB.event, logB.data)
  t.isEqual(Log.logEntries.length, 2)
  t.end()
})

test('log() records the time of the entry', t => {
  t.isEqual(typeof Log.logEntries[0].time, 'number')
  t.end()
})

test('log() records the event of the entry', t => {
  t.isEqual(typeof Log.logEntries[0].event, 'string')
  t.end()
})
test('log() records the data of the entry', t => {
  t.isEqual(typeof Log.logEntries[0].data, 'object')
  t.end()
})

test('toConsole() returns an array of the output', t => {
  const actualOutput = Log.toConsole()
  t.isEqual(actualOutput.length, 2)
  t.end()
})

test('findWithDataAttribute() finds the key in the object', t => {
  const found = Log.findWithDataAttribute('keyA')
  t.isEqual(found.length, 1)
  t.isEqual(found[0].event, 'Log - A')
  t.end()
})

test('findWithDataAttribute() returns an empty array if the key is not found', t => {
  const found = Log.findWithDataAttribute('keyX')
  t.isEqual(found.length, 0)
  t.end()
})

test('findWithDataAttribute() finds all entries with the key', t => {
  const found = Log.findWithDataAttribute('key')
  t.isEqual(found.length, 2)
  t.end()
})

test('findWithDataAttribute() finds the nested key in the object', t => {
  const found = Log.findWithDataAttribute('nestedKey')
  t.isEqual(found.length, 1)
  t.isEqual(found[0].event, 'Log - B')
  t.end()
})

test('findWithDataAttribute() finds deeply nested key in the object', t => {
  const found = Log.findWithDataAttribute('deepNestedKey')
  t.isEqual(found.length, 1)
  t.isEqual(found[0].event, 'Log - B')
  t.end()
})
