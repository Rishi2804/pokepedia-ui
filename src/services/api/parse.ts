export class ApiParseError extends Error {
    constructor(public field: string, public value: unknown) {
        super(`Unexpected value at "${field}": ${JSON.stringify(value)}`);
        this.name = "ApiParseError";
    }
}

export const asEnum = <E extends Record<string, string>>(e: E, v: unknown, field: string): E[keyof E] => {
    if (typeof v === 'string' && v in e) return v as E[keyof E];
    throw new ApiParseError(field, v);
};

export const asNullableEnum = <E extends Record<string, string>>(e: E, v: unknown, field: string): E[keyof E] | null => {
    return v == null ? null : asEnum(e, v, field);
};
