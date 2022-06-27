import 'colors'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { MadLogger } from './mad-logger'
import { Logger } from './logger'
import { MadLoggerConfig } from './mad-logger-config'
import { LoggerManager } from './logger-manager'
import { MadConsoleTransportConfig, MadFileTransportConfig } from './mad-transport-config'
import { printMeta } from '../utils/print-meta'

const defaultConsoleLoggerFormat: winston.Logform.Format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS'
  }),
  winston.format.simple(),
  winston.format.printf(info => `${info.timestamp} ${printMeta(info)} `.grey + ` ${info.level}: ${info.message} `)
)

const defaultFileLoggerFormat: winston.Logform.Format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS'
  }),
  winston.format.simple(),
  winston.format.printf(info => `${info.timestamp} ${printMeta(info)}  ${info.level}: ${info.message} `)
)

const defaultLoggerConfig: MadLoggerConfig = {
  level: 'debug',
  format: defaultConsoleLoggerFormat
}

const defaultTransportConfig = defaultLoggerConfig

const defaultFileTransportConfig = {
  ...defaultTransportConfig,
  format: defaultFileLoggerFormat,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
}

export class MadLoggerManager implements LoggerManager {
  private transports: Array<winston.transport> = []

  public createLogger (name: string, config?: MadLoggerConfig): Logger {
    const loggerConfig = {
      ...defaultLoggerConfig,
      ...config
    }
    return new MadLogger(name, loggerConfig, this.transports)
  }

  public addTransport (transport: winston.transport | Array<winston.transport>) {
    if (Array.isArray(transport)) {
      this.transports.push(...transport)
    } else {
      this.transports.push(transport)
    }
  }

  public getConsoleTransport (config?: MadConsoleTransportConfig): winston.transports.ConsoleTransportInstance {
    const consoleTransportConfig = {
      ...defaultTransportConfig,
      ...config
    }
    return new winston.transports.Console(consoleTransportConfig)
  }

  public getFileTransport (config: MadFileTransportConfig): DailyRotateFile {
    const fileTransportConfig = {
      ...defaultFileTransportConfig,
      ...config
    }
    if (!fileTransportConfig.filename) {
      throw new Error('You must specify a filename in config to get the file transport')
    }
    return new DailyRotateFile(fileTransportConfig)
  }
}
