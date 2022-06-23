import { LoggerMeta } from './logger-meta'

export interface Logger {
  info: (message: string, meta?: LoggerMeta) => void,
  error: (message: string, meta?: LoggerMeta) => void,
  warn: (message: string, meta?: LoggerMeta) => void,
  debug: (message: string, meta?: LoggerMeta) => void,
  child: (name: string, meta?: LoggerMeta) => Logger
}
