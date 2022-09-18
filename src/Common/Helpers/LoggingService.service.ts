import { DateTime } from "luxon";

export class LoggingService {
    private process = [];

    /**
     * Service to make initial log of a process
     * @param traceUUID - Identifier of process
     * @param processDescription - Description of process
     */
    initialLog(traceUUID: string, processDescription: any): void {
        console.log(
            `${traceUUID}-${DateTime.now()}-${processDescription} Initializing`
        );
        this.process.push({
            processName: processDescription,
            timeStamp: DateTime.now(),
        });
    }

    /**
     * Service to make final log of a process
     * @param traceUUID - Identifier of process
     * @param processDescription - Description of process, must match with an existing record
     */
    finalLog(traceUUID: string, processDescription: string): void {
        try {
            const initialTimeStamp = this.process.filter((process) => {
                return process.processName === processDescription;
            });

            if (initialTimeStamp) {
                this.process.splice(
                    this.process.indexOf(initialTimeStamp[0]),
                    1
                );
            } else {
                console.log(
                    `Error, process with identificator: ${processDescription} not initialized`
                );
                return;
            }

            const processDuration = DateTime.now().diff(
                initialTimeStamp[0].timeStamp,
                "seconds"
            );
            console.log(
                `${traceUUID}-${DateTime.now()}-${processDescription} Finishing with ${processDuration}`
            );
        } catch (err) {
            console.error(
                `Error, with the process with identificator: ${processDescription}`
            );
        }
    }

    /**
     * Service to log an error
     * @param traceUUID - Process identifier
     * @param error - Error
     */
    errorLog(traceUUID: string, error: any) {
        console.error(`${traceUUID}-${DateTime.now()}-${error} Error`);
    }
}
