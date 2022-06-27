import { MadLoggerManager } from './mad-logger-manager'
import { Logger } from './logger'
import { MadFileLoggerConfig } from './mad-logger-config'
import { LoggerMeta } from './logger-meta'

export class MadFileLogger implements Logger {
  private logger: Logger
  constructor (private readonly name: string, private readonly config: MadFileLoggerConfig) {
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
    const childConfig = this.config
    if (meta) {
      childConfig.meta = {
        ...childConfig.meta,
        ...meta
      }
    }
    return new MadFileLogger(name, childConfig)
  }

  private createLogger (): Logger {
    const { meta, ...fileTransportConfig } = this.config
    const loggerManager = new MadLoggerManager()
    const fileTransport = loggerManager.getFileTransport(fileTransportConfig)
    loggerManager.addTransport(fileTransport)
    return loggerManager.createLogger(this.name, { meta })
  }
}
