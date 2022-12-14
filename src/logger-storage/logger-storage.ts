import { Logger } from "../logger/logger"

export interface LoggerStorage<T = Logger> {
    add(id: string): void
    get(id: string): T
}