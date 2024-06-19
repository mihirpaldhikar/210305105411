import {StatusCode} from "@/enums/StatusCodes";

interface ErrorResponse {
    statusCode: StatusCode;
    message: string;
}

interface SuccessResponse<T> {
    statusCode: StatusCode;
    payload: T;
}

export type Response<T> = SuccessResponse<T> | ErrorResponse;