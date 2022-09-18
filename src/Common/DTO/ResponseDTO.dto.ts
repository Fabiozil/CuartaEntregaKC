export class ResponseDTO {
    status: string;
    message: string;
    data: StandartResponse;
}

interface StandartResponse {
    response: Array<any>;
}
