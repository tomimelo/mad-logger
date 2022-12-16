import { Logger } from "../logger/logger"

export interface LoggerStorage<T = Logger, U = unknown> {
    add(loggerOrConfig: T | U): void
    get(id: string): T
}