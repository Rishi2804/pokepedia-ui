import {ApiResponse} from "./types.ts";

export const assertUrl = (url: string)=> {
    if (!url) throw new Error("Missing required URL endpoint")
};

export const onFailure = <T>(response: Response, message?: string): ApiResponse<T> => {
    const { status, statusText, headers, redirected } = response;

    return {ok: false, error: message || statusText || `Request failed with status ${status}`, headers, status, redirected};
}

export const onSuccess = <T>(data: T): ApiResponse<T> => {
    return {ok: true, data};
}
