import { LoggerStorage } from './logger-storage'
import { MadLogger } from '../logger/mad-logger'
import { MadError } from 'mad-error'

export class MadLoggerStorage implements LoggerStorage<MadLogger> {
  protected loggers: Map<string, MadLogger> = new Map()

  public add(id: string): void {
    if (this.loggers.has(id)) {
      throw new MadError(`A logger with id ${id} already exists`)
    }
    this.loggers.set(id, {} as MadLogger)
  }

  public get(id: string): MadLogger {
    const logger = this.loggers.get(id)
    if (!logger) {
      throw new MadError(`Logger with id ${id} does not exists`)
    }
    return logger
  }
}

export const loggerStorage = new MadLoggerStorage()
