import {HoldableItem} from "../../../global/types.ts";

export function parseHoldableItems(json: unknown): HoldableItem[] {
    return json as HoldableItem[];
}
