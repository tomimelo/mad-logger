import { Logger } from './logger'
import pino, { Logger as PinoLogger } from 'pino'
import { MadLoggerConfig } from './mad-logger-config'
import { generateId } from '../utils/generate-id'

export class MadLogger implements Logger {
  public id: string
  private logger: PinoLogger

  public constructor(private readonly config: MadLoggerConfig = {}) {
    const {id, ...loggerConfig} = this.config
    this.id = id || generateId()
    this.logger = this.createLogger(loggerConfig)
  }

  public info(objectOrMessage: object | string, message?: string): void {
    this.logger.info(objectOrMessage, message)
  }

  public error(objectOrMessage: object | string, message?: string): void {
    this.logger.error(objectOrMessage, message)
  }

  public warn(objectOrMessage: object | string, message?: string): void {
    this.logger.warn(objectOrMessage, message)
  }

  public debug(objectOrMessage: object | string, message?: string): void {
    this.logger.debug(objectOrMessage, message)
  }

  private createLogger(config: Partial<MadLoggerConfig>): PinoLogger {
    return pino(config)
  }
}
