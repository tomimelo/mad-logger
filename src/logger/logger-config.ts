import { LoggerMeta } from './logger-meta'
import { FileTransportConfig, TransportConfig } from './transport-config'
export interface LoggerConfig extends TransportConfig {
  meta?: LoggerMeta
}

export type ConsoleLoggerConfig = LoggerConfig

export type FileLoggerConfig = FileTransportConfig & LoggerConfig
