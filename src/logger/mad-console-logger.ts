import { MadLoggerManager } from './mad-logger-manager'
import { Logger } from './logger'
import { MadConsoleLoggerConfig } from './mad-logger-config'
import { LoggerMeta } from './logger-meta'

export class MadConsoleLogger implements Logger {
  private logger: Logger
  public constructor (private readonly name: string, private readonly config?: MadConsoleLoggerConfig) {
    this.logger = this.createLogger()
  }

  public info (message: string, meta?: LoggerMeta): void {
    this.logger.info(message, meta)
  }

  public error (message: string, meta?: LoggerMeta): void {
    this.logger.error(message, meta)
  }

  public warn (message: string, meta?: LoggerMeta): void {
    this.logger.warn(message, meta)
  }

  public debug (message: string, meta?: LoggerMeta): void {
    this.logger.debug(message, meta)
  }

  public child (name: string, meta?: LoggerMeta): Logger {
    const childConfig = this.config || {}
    if (meta) {
      childConfig.meta = {
        ...childConfig.meta,
        ...meta
      }
    }
    return new MadConsoleLogger(name, childConfig)
  }

  private createLogger (): Logger {
    const { meta, ...consoleTransportConfig } = this.config || {}
    const loggerManager = new MadLoggerManager()
    const consoleTransport = loggerManager.getConsoleTransport(consoleTransportConfig)
    loggerManager.addTransport(consoleTransport)
    return loggerManager.createLogger(this.name, { meta })
  }
}
