"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingService = void 0;
const luxon_1 = require("luxon");
class LoggingService {
    constructor() {
        this.process = [];
    }
    /**
     * Service to make initial log of a process
     * @param traceUUID - Identifier of process
     * @param processDescription - Description of process
     */
    initialLog(traceUUID, processDescription) {
        console.log(`${traceUUID}-${luxon_1.DateTime.now()}-${processDescription} Initializing`);
        this.process.push({
            processName: processDescription,
            timeStamp: luxon_1.DateTime.now(),
        });
    }
    /**
     * Service to make final log of a process
     * @param traceUUID - Identifier of process
     * @param processDescription - Description of process, must match with an existing record
     */
    finalLog(traceUUID, processDescription) {
        try {
            const initialTimeStamp = this.process.filter((process) => {
                return process.processName === processDescription;
            });
            if (initialTimeStamp) {
                this.process.splice(this.process.indexOf(initialTimeStamp[0]), 1);
            }
            else {
                console.log(`Error, process with identificator: ${processDescription} not initialized`);
                return;
            }
            const processDuration = luxon_1.DateTime.now().diff(initialTimeStamp[0].timeStamp, "seconds");
            console.log(`${traceUUID}-${luxon_1.DateTime.now()}-${processDescription} Finishing with ${processDuration}`);
        }
        catch (err) {
            console.error(`Error, with the process with identificator: ${processDescription}`);
        }
    }
    /**
     * Service to log an error
     * @param traceUUID - Process identifier
     * @param error - Error
     */
    errorLog(traceUUID, error) {
        console.error(`${traceUUID}-${luxon_1.DateTime.now()}-${error} Error`);
    }
}
exports.LoggingService = LoggingService;
