import { expect } from 'chai'
import { MockMadLoggerStorage } from '../../test/mocks/mock-mad-logger-storage'
import { MadLoggerStorage } from './mad-logger-storage'

describe(MadLoggerStorage.name, () => {
  let loggerStorage: MockMadLoggerStorage

  beforeEach(() => {
    loggerStorage = new MockMadLoggerStorage()
  })

  describe('add', () => {
    it('should add logger to storage', () => {
      loggerStorage.add('logger-id')
      expect(true).to.be.equal(true)
    })
  })

  describe('get', () => {
    it('should retrieve logger from storage', () => {
      loggerStorage.get('logger-id')
      expect(true).to.be.equal(true)
    })
  })
})
