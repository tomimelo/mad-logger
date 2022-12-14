import { MadLoggerStorage } from '../../src/logger-storage/mad-logger-storage'

export class MockMadLoggerStorage extends MadLoggerStorage {
  public constructor() {
    super()
  }

  public get loggers(): ReadonlyArray<any> {
    return []
  }
}
