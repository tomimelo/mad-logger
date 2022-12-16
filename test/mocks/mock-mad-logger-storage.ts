import { MadLoggerStorage } from '../../src/logger-storage/mad-logger-storage'
import { MadLogger } from '../../src/logger/mad-logger'

export class MockMadLoggerStorage extends MadLoggerStorage {
  public constructor(private readonly initialLoggers: Map<string, MadLogger> = new Map()) {
    super()
    this.loggers = this.initialLoggers
  }

  public get loggersMap(): Map<string, MadLogger> {
    return this.loggers
  }
}
