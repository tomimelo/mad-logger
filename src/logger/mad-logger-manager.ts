import 'colors'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { MadLogger } from './mad-logger'
import { Logger } from './logger'
import { LoggerConfig } from './logger-config'
import { LoggerManager } from './logger-manager'
import { ConsoleTransportConfig, FileTransportConfig } from './transport-config'
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

const defaultLoggerConfig: LoggerConfig = {
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

  public createLogger (name: string, config?: LoggerConfig): Logger {
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

  public getConsoleTransport (config?: ConsoleTransportConfig): winston.transports.ConsoleTransportInstance {
    const consoleTransportConfig = {
      ...defaultTransportConfig,
      ...config
    }
    return new winston.transports.Console(consoleTransportConfig)
  }

  public getFileTransport (config: FileTransportConfig): DailyRotateFile {
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
