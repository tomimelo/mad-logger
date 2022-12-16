import { LoggerStorage } from './logger-storage'
import { MadLogger } from '../logger/mad-logger'
import { MadError } from 'mad-error'
import { MadLoggerConfig } from '../logger/mad-logger-config'
import { generateId } from '../utils/generate-id'

export class MadLoggerStorage implements LoggerStorage<MadLogger, MadLoggerConfig> {
  protected loggers: Map<string, MadLogger> = new Map()

  public add(loggerOrConfig: MadLogger | MadLoggerConfig): void {
    const loggerId = loggerOrConfig instanceof MadLogger ? loggerOrConfig.id : loggerOrConfig.id || generateId()
    if (this.loggers.has(loggerId)) {
      throw new MadError(`A logger with id ${loggerId} already exists`)
    }
    const logger = loggerOrConfig instanceof MadLogger ? loggerOrConfig : new MadLogger({id: loggerId})
    this.loggers.set(loggerId, logger)
  }

  public get(id: string): MadLogger {
    const logger = this.loggers.get(id)
    if (!logger) {
      throw new MadError(`Logger with id ${id} does not exists`)
    }
    return logger
  }
}
