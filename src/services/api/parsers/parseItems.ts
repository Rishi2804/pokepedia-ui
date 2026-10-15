import {ItemGroup, ItemSnapshot} from "../../../global/types.ts";
import {titleCase} from "../../../global/utils.ts";

interface WireItemSnap {
    id: number;
    slug: string;
    name: string;
    gen: number | null;
    category: string;
    pocket: string;
    sprite: string;
}

function toItemSnapshot(item: WireItemSnap): ItemSnapshot {
    return {
        id: item.id,
        slug: item.slug,
        name: item.name,
        gen: item.gen,
        category: item.category,
        pocket: item.pocket,
        sprite: item.sprite,
    };
}

// Display order and labels for PokeAPI's pockets. An unknown pocket (PokeAPI
// adding one) still renders, last, under its title-cased slug.
const POCKETS: { pocket: string; label: string }[] = [
    {pocket: "pokeballs", label: "Poké Balls"},
    {pocket: "medicine", label: "Medicine"},
    {pocket: "battle", label: "Battle Items"},
    {pocket: "berries", label: "Berries"},
    {pocket: "misc", label: "Other Items"},
    {pocket: "mail", label: "Mail"},
    {pocket: "key", label: "Key Items"},
];

export function parseItems(json: unknown): ItemGroup[] {
    const items = (json as WireItemSnap[]).map(toItemSnapshot);

    const byPocket = new Map<string, ItemSnapshot[]>();
    for (const item of items) {
        const bucket = byPocket.get(item.pocket);
        if (bucket) bucket.push(item);
        else byPocket.set(item.pocket, [item]);
    }

    const known = new Set(POCKETS.map(p => p.pocket));
    const unknown = [...byPocket.keys()].filter(pocket => !known.has(pocket)).sort();

    return [
        ...POCKETS,
        ...unknown.map(pocket => ({pocket, label: titleCase(pocket)})),
    ]
        .filter(({pocket}) => byPocket.has(pocket))
        .map(({pocket, label}) => ({pocket, label, items: byPocket.get(pocket)!}));
}
