import {HoldableItem} from "../../../global/types.ts";

interface WireHoldableItem {
    showdownId: string;
    name: string;
    image: string;
    shortEffect: string;
}

function toHoldableItem(item: WireHoldableItem): HoldableItem {
    return {
        showdownId: item.showdownId,
        name: item.name,
        image: item.image,
        shortEffect: item.shortEffect,
    };
}

export function parseHoldableItems(json: unknown): HoldableItem[] {
    return (json as WireHoldableItem[]).map(toHoldableItem);
}
