import winston from 'winston'
import { MadLoggerLevel } from './mad-logger-level'

export interface MadTransportConfig {
  level?: MadLoggerLevel,
  format?: winston.Logform.Format
}

export type MadConsoleTransportConfig = MadTransportConfig

export interface MadFileTransportConfig extends MadTransportConfig {
  filename: string,
  datePattern?: string,
  zippedArchive?: boolean,
  maxSize?: string,
  maxFiles?: string
}
