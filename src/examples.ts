import { MadLoggerStorage } from "./logger-storage/mad-logger-storage";
import { MadLogger } from "./logger/mad-logger";

const logger = new MadLogger({name: 'MyLogger'})
logger.info(logger.id)

const loggerStorage = new MadLoggerStorage()
loggerStorage.add(logger)

const loggerRetrieved = loggerStorage.get(logger.id)

loggerRetrieved.info('I was retrieved from the storage')