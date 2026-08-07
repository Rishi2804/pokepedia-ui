import {assertUrl, onFailure, onSuccess} from "./api.utils.ts";
import {ApiParseError} from "./parse.ts";
import {ApiResponse} from "./types.ts";

async function parseResponse<T>(response: Response, parse: (json: unknown) => T): Promise<ApiResponse<T>> {
    let json: unknown;
    try {
        json = await response.json();
    } catch (e) {
        console.error(e);
        return onFailure(response, "Received an invalid response from the server");
    }

    try {
        return onSuccess(parse(json));
    } catch (e) {
        console.error(e);
        const message = e instanceof ApiParseError ? e.message : "Received an unexpected response shape from the server";
        return onFailure(response, message);
    }
}

export const makeGetRequest = async <T>(url: string, parse: (json: unknown) => T): Promise<ApiResponse<T>> => {
    assertUrl(url);

    const response = await fetch(url, {headers: new Headers({'Content-Type': 'application/json'}), method: "GET"});

    if (!response.ok || response.redirected) {
        return onFailure(response);
    }

    return parseResponse(response, parse);
}
