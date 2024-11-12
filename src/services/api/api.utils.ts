import {IApiResponse} from "./types.ts";

export const assertUrl = (url: string)=> {
    if (!url) throw new Error("Missing required URL endpoint")
};

export const onFailure = <T>(response: Response): IApiResponse<T> => {
    const { status, statusText, headers, redirected } = response;

    return {ok: false, error: statusText, headers, status, redirected};
}

export const onSuccess = <T>(data: T): IApiResponse<T> => {
    return {ok: true, data};
}