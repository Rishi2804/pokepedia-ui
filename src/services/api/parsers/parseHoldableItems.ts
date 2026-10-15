import {HoldableItem} from "../../../global/types.ts";

interface WireHoldableItem {
    showdownId: string;
    name: string;
    sprite: string;
    shortEffect: string;
}

function toHoldableItem(item: WireHoldableItem): HoldableItem {
    return {
        showdownId: item.showdownId,
        name: item.name,
        sprite: item.sprite,
        shortEffect: item.shortEffect,
    };
}

export function parseHoldableItems(json: unknown): HoldableItem[] {
    return (json as WireHoldableItem[]).map(toHoldableItem);
}
