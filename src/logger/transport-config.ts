import winston from 'winston'
import { LoggerLevel } from './logger-level'

export interface TransportConfig {
  level?: LoggerLevel,
  format?: winston.Logform.Format
}

export type ConsoleTransportConfig = TransportConfig

export interface FileTransportConfig extends TransportConfig {
  filename: string,
  datePattern?: string,
  zippedArchive?: boolean,
  maxSize?: string,
  maxFiles?: string
}
