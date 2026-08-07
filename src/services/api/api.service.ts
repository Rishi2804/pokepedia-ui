export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}

export async function getJson<T>(url: string, parse: (json: unknown) => T): Promise<T> {
    if (!url) throw new Error("Missing required URL endpoint");

    const response = await fetch(url, {headers: new Headers({'Content-Type': 'application/json'}), method: "GET"});

    if (!response.ok || response.redirected) {
        throw new ApiError(response.status, response.statusText || `Request failed with status ${response.status}`);
    }

    let json: unknown;
    try {
        json = await response.json();
    } catch (e) {
        console.error(e);
        throw new ApiError(response.status, "Received an invalid response from the server");
    }

    return parse(json);
}
