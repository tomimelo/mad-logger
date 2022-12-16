import { Logger } from './logger'
import pino, { Logger as PinoLogger } from 'pino'
import { MadLoggerConfig } from './mad-logger-config'

const generateId = (): string => Math.random().toString(16).slice(2)

export class MadLogger implements Logger {
  public id: string
  private logger: PinoLogger

  public constructor(private readonly config: MadLoggerConfig = {}) {
    this.id = this.config.id || generateId()
    this.logger = this.createLogger()
  }

  public info(message: string): void {
    this.logger.info(message)
  }

  public error(message: string): void {
    this.logger.error(message)
  }

  public warn(message: string): void {
    this.logger.warn(message)
  }

  public debug(message: string): void {
    this.logger.debug(message)
  }

  private createLogger(): PinoLogger {
    return pino()
  }
}
