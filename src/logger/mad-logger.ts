import winston from 'winston'
import { Logger } from './logger'
import { MadLoggerConfig } from './mad-logger-config'
import { LoggerMeta } from './logger-meta'

export class MadLogger implements Logger {
  private logger: winston.Logger
  public constructor(
    private readonly name: string,
    private readonly config: MadLoggerConfig,
    private readonly transports: Array<winston.transport>,
  ) {
    this.logger = this.createLogger()
  }

  public info(message: string, meta?: LoggerMeta): void {
    this.logger.info(message, meta)
  }

  public error(message: string, meta?: LoggerMeta): void {
    this.logger.error(message, meta)
  }

  public warn(message: string, meta?: LoggerMeta): void {
    this.logger.warn(message, meta)
  }

  public debug(message: string, meta?: LoggerMeta): void {
    this.logger.debug(message, meta)
  }

  public child(name: string, meta?: LoggerMeta): Logger {
    const childConfig = this.config
    if (meta) {
      childConfig.meta = {
        ...childConfig.meta,
        ...meta,
      }
    }
    return new MadLogger(name, childConfig, this.transports)
  }

  private createLogger(): winston.Logger {
    if (!this.transports.length) {
      throw new Error('You must add a transport before creating logger')
    }
    const meta = this.config.meta || {}
    return winston.createLogger({
      defaultMeta: {
        ...(this.name && { namespace: this.name }),
        ...meta,
      },
      transports: this.transports,
    })
  }
}
