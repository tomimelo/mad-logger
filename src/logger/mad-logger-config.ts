import { MadFileTransportConfig } from './mad-transport-config'
export interface MadLoggerConfig {
  id?: string
}

export type MadConsoleLoggerConfig = MadLoggerConfig

export type MadFileLoggerConfig = MadFileTransportConfig & MadLoggerConfig
