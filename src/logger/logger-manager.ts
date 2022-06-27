import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { Logger } from './logger'
import { LoggerMeta } from './logger-meta'
import { MadConsoleTransportConfig, MadFileTransportConfig } from './mad-transport-config'

export interface LoggerManager {
  createLogger: (name: string, meta: LoggerMeta) => Logger,
  addTransport: (transport: winston.transport | Array<winston.transport>) => void,
  getConsoleTransport: (config: MadConsoleTransportConfig) => winston.transports.ConsoleTransportInstance,
  getFileTransport: (config: MadFileTransportConfig) => DailyRotateFile,
}
