import { LoggerMeta } from './logger-meta'
import { MadFileTransportConfig, MadTransportConfig } from './mad-transport-config'
export interface MadLoggerConfig extends MadTransportConfig {
  meta?: LoggerMeta
}

export type MadConsoleLoggerConfig = MadLoggerConfig

export type MadFileLoggerConfig = MadFileTransportConfig & MadLoggerConfig
