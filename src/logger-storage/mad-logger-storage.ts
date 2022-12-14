import { LoggerStorage } from "./logger-storage";
import { MadLogger } from "../logger/mad-logger";

export class MadLoggerStorage implements LoggerStorage<MadLogger> {
    add(id: string): void {
        throw new Error("Method not implemented.");
    }
    get(id: string): MadLogger {
        throw new Error("Method not implemented.");
    }

}