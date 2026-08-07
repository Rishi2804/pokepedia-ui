// Placeholder held-item list. There is no items table or endpoint in the API
// yet, so this is a small hardcoded stand-in for the future /api/v1/item —
// selecting one only sets PokemonTeamMember.item to its slug; nothing reads
// or acts on it. Names/gens are taken from ../../../../pokemon-showdown/data/items.ts
// (the sibling repo) so they at least introduce items in the right era.
export interface PlaceholderItem {
    slug: string;
    name: string;
    gen: number;
}

export const PLACEHOLDER_ITEMS: PlaceholderItem[] = [
    {slug: 'leftovers', name: 'Leftovers', gen: 2},
    {slug: 'choiceband', name: 'Choice Band', gen: 3},
    {slug: 'sitrusberry', name: 'Sitrus Berry', gen: 3},
    {slug: 'lumberry', name: 'Lum Berry', gen: 3},
    {slug: 'mentalherb', name: 'Mental Herb', gen: 3},
    {slug: 'whiteherb', name: 'White Herb', gen: 3},
    {slug: 'choicespecs', name: 'Choice Specs', gen: 4},
    {slug: 'choicescarf', name: 'Choice Scarf', gen: 4},
    {slug: 'lifeorb', name: 'Life Orb', gen: 4},
    {slug: 'focussash', name: 'Focus Sash', gen: 4},
    {slug: 'blacksludge', name: 'Black Sludge', gen: 4},
    {slug: 'expertbelt', name: 'Expert Belt', gen: 4},
    {slug: 'rockyhelmet', name: 'Rocky Helmet', gen: 5},
    {slug: 'eviolite', name: 'Eviolite', gen: 5},
    {slug: 'airballoon', name: 'Air Balloon', gen: 5},
    {slug: 'assaultvest', name: 'Assault Vest', gen: 6},
    {slug: 'weaknesspolicy', name: 'Weakness Policy', gen: 6},
    {slug: 'safetygoggles', name: 'Safety Goggles', gen: 6},
    {slug: 'heavydutyboots', name: 'Heavy-Duty Boots', gen: 8},
    {slug: 'boosterenergy', name: 'Booster Energy', gen: 9},
];

export function itemsForGen(gen: number): PlaceholderItem[] {
    return PLACEHOLDER_ITEMS.filter(item => item.gen <= gen);
}
