import { expect } from 'chai'
import { MockMadLoggerStorage } from '../../test/mocks/mock-mad-logger-storage'
import { MadLoggerStorage } from './mad-logger-storage'
import { MadLogger } from '../logger/mad-logger'

describe(MadLoggerStorage.name, () => {
  let loggerStorage: MockMadLoggerStorage

  beforeEach(() => {
    loggerStorage = new MockMadLoggerStorage()
  })

  describe('add', () => {
    describe('and logger was already added', () => {
      const loggerId = 'existent-logger'
      beforeEach(() => {
        const initialLoggers = new Map<string, MadLogger>().set(loggerId, {} as MadLogger)
        loggerStorage = new MockMadLoggerStorage(initialLoggers)
      });
      
      it('should throw an error', () => {
        expect(() => loggerStorage.add(loggerId)).to.throw(`A logger with id ${loggerId} already exists`)
      });
    });

    describe('and logger was not added yet', () => {
      it('should add logger to storage', () => {
        const loggerId = 'logger-id'
        loggerStorage.add(loggerId)
        expect(loggerStorage.loggersMap.has(loggerId)).to.be.equal(true)
      })
    });
  })

  describe('get', () => {
    describe('given logger does not exists in the storage', () => {
      const loggerId = 'inexistent-logger'
      it('should throw an error', () => {
        expect(() => loggerStorage.get(loggerId)).to.throw(`Logger with id ${loggerId} does not exists`)
      });
    });

    describe('given logger exists in the storage', () => {
      const loggerId = 'existent-logger'
      const initialLogger = {} as MadLogger
      beforeEach(() => {
        const initialLoggers = new Map<string, MadLogger>().set(loggerId, initialLogger)
        loggerStorage = new MockMadLoggerStorage(initialLoggers)
      });
      it('should retrieve logger from storage', () => {
        const logger = loggerStorage.get(loggerId)
        expect(logger).to.be.equal(initialLogger)
      })
    });
  })
})
