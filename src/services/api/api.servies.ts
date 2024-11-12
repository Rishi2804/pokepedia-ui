import {assertUrl, onFailure, onSuccess} from "./api.utils.ts";


async function parseResponse(response: Response) {
    try {
        const json = await response.json();
        return onSuccess(json);
    } catch (e) {
        console.error(e);
        return onFailure(response);
    }
}

export const makeGetRequest = async (url: string) => {
    assertUrl(url);

    const response = await fetch(url, {headers: new Headers({'Content-Type': 'application/json'}), method: "GET"});

    if (!response.ok || response.redirected) {
        return onFailure(response);
    }

    return parseResponse(response);
}