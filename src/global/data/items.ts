import type {BattleFormatKey} from "../../services/battle/protocol.ts";

// Placeholder held-item list. There is no items table or endpoint in the API
// yet, so this is a small hardcoded stand-in for the future /api/v1/item —
// selecting one only sets PokemonTeamMember.item to its slug; nothing reads
// or acts on it. Names/gens are taken from ../../../../pokemon-showdown/data/items.ts
// (the sibling repo) so they at least introduce items in the right era.
export interface PlaceholderItem {
    slug: string;
    name: string;
    gen: number;
    /** Last gen the item is legal in. Mega Stones and Z-Crystals were removed
     *  from the games after gen 7, so gen 8/9 reject them outright — without an
     *  upper bound they would leak into those teams and fail server validation.
     *  Undefined means "still legal". */
    maxGen?: number;
    /** Only selectable in the National Dex format. The Legends: Z-A Mega Stones
     *  are tagged `Future` (unreleased) in Showdown's data and are rejected by
     *  every numbered gen including gen 9 — see pokepedia-battle's formats.ts. */
    natDexOnly?: boolean;
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

    // --- Mega Stones (gen 6-7, and National Dex) ---
    {slug: 'abomasite', name: 'Abomasite', gen: 6, maxGen: 7},
    {slug: 'absolite', name: 'Absolite', gen: 6, maxGen: 7},
    {slug: 'aerodactylite', name: 'Aerodactylite', gen: 6, maxGen: 7},
    {slug: 'aggronite', name: 'Aggronite', gen: 6, maxGen: 7},
    {slug: 'alakazite', name: 'Alakazite', gen: 6, maxGen: 7},
    {slug: 'altarianite', name: 'Altarianite', gen: 6, maxGen: 7},
    {slug: 'ampharosite', name: 'Ampharosite', gen: 6, maxGen: 7},
    {slug: 'audinite', name: 'Audinite', gen: 6, maxGen: 7},
    {slug: 'banettite', name: 'Banettite', gen: 6, maxGen: 7},
    {slug: 'beedrillite', name: 'Beedrillite', gen: 6, maxGen: 7},
    {slug: 'blastoisinite', name: 'Blastoisinite', gen: 6, maxGen: 7},
    {slug: 'blazikenite', name: 'Blazikenite', gen: 6, maxGen: 7},
    {slug: 'cameruptite', name: 'Cameruptite', gen: 6, maxGen: 7},
    {slug: 'charizarditex', name: 'Charizardite X', gen: 6, maxGen: 7},
    {slug: 'charizarditey', name: 'Charizardite Y', gen: 6, maxGen: 7},
    {slug: 'diancite', name: 'Diancite', gen: 6, maxGen: 7},
    {slug: 'galladite', name: 'Galladite', gen: 6, maxGen: 7},
    {slug: 'garchompite', name: 'Garchompite', gen: 6, maxGen: 7},
    {slug: 'gardevoirite', name: 'Gardevoirite', gen: 6, maxGen: 7},
    {slug: 'gengarite', name: 'Gengarite', gen: 6, maxGen: 7},
    {slug: 'glalitite', name: 'Glalitite', gen: 6, maxGen: 7},
    {slug: 'gyaradosite', name: 'Gyaradosite', gen: 6, maxGen: 7},
    {slug: 'heracronite', name: 'Heracronite', gen: 6, maxGen: 7},
    {slug: 'houndoominite', name: 'Houndoominite', gen: 6, maxGen: 7},
    {slug: 'kangaskhanite', name: 'Kangaskhanite', gen: 6, maxGen: 7},
    {slug: 'latiasite', name: 'Latiasite', gen: 6, maxGen: 7},
    {slug: 'latiosite', name: 'Latiosite', gen: 6, maxGen: 7},
    {slug: 'lopunnite', name: 'Lopunnite', gen: 6, maxGen: 7},
    {slug: 'lucarionite', name: 'Lucarionite', gen: 6, maxGen: 7},
    {slug: 'manectite', name: 'Manectite', gen: 6, maxGen: 7},
    {slug: 'mawilite', name: 'Mawilite', gen: 6, maxGen: 7},
    {slug: 'medichamite', name: 'Medichamite', gen: 6, maxGen: 7},
    {slug: 'metagrossite', name: 'Metagrossite', gen: 6, maxGen: 7},
    {slug: 'mewtwonitex', name: 'Mewtwonite X', gen: 6, maxGen: 7},
    {slug: 'mewtwonitey', name: 'Mewtwonite Y', gen: 6, maxGen: 7},
    {slug: 'pidgeotite', name: 'Pidgeotite', gen: 6, maxGen: 7},
    {slug: 'pinsirite', name: 'Pinsirite', gen: 6, maxGen: 7},
    {slug: 'sablenite', name: 'Sablenite', gen: 6, maxGen: 7},
    {slug: 'salamencite', name: 'Salamencite', gen: 6, maxGen: 7},
    {slug: 'sceptilite', name: 'Sceptilite', gen: 6, maxGen: 7},
    {slug: 'scizorite', name: 'Scizorite', gen: 6, maxGen: 7},
    {slug: 'sharpedonite', name: 'Sharpedonite', gen: 6, maxGen: 7},
    {slug: 'slowbronite', name: 'Slowbronite', gen: 6, maxGen: 7},
    {slug: 'steelixite', name: 'Steelixite', gen: 6, maxGen: 7},
    {slug: 'swampertite', name: 'Swampertite', gen: 6, maxGen: 7},
    {slug: 'tyranitarite', name: 'Tyranitarite', gen: 6, maxGen: 7},
    {slug: 'venusaurite', name: 'Venusaurite', gen: 6, maxGen: 7},

    // --- Legends: Z-A Mega Stones (National Dex only) ---
    {slug: 'absolitez', name: 'Absolite Z', gen: 9, natDexOnly: true},
    {slug: 'barbaracite', name: 'Barbaracite', gen: 9, natDexOnly: true},
    {slug: 'baxcalibrite', name: 'Baxcalibrite', gen: 9, natDexOnly: true},
    {slug: 'chandelurite', name: 'Chandelurite', gen: 9, natDexOnly: true},
    {slug: 'chesnaughtite', name: 'Chesnaughtite', gen: 9, natDexOnly: true},
    {slug: 'chimechite', name: 'Chimechite', gen: 9, natDexOnly: true},
    {slug: 'clefablite', name: 'Clefablite', gen: 9, natDexOnly: true},
    {slug: 'crabominite', name: 'Crabominite', gen: 9, natDexOnly: true},
    {slug: 'darkranite', name: 'Darkranite', gen: 9, natDexOnly: true},
    {slug: 'delphoxite', name: 'Delphoxite', gen: 9, natDexOnly: true},
    {slug: 'dragalgite', name: 'Dragalgite', gen: 9, natDexOnly: true},
    {slug: 'dragoninite', name: 'Dragoninite', gen: 9, natDexOnly: true},
    {slug: 'drampanite', name: 'Drampanite', gen: 9, natDexOnly: true},
    {slug: 'eelektrossite', name: 'Eelektrossite', gen: 9, natDexOnly: true},
    {slug: 'emboarite', name: 'Emboarite', gen: 9, natDexOnly: true},
    {slug: 'excadrite', name: 'Excadrite', gen: 9, natDexOnly: true},
    {slug: 'falinksite', name: 'Falinksite', gen: 9, natDexOnly: true},
    {slug: 'feraligite', name: 'Feraligite', gen: 9, natDexOnly: true},
    {slug: 'floettite', name: 'Floettite', gen: 9, natDexOnly: true},
    {slug: 'froslassite', name: 'Froslassite', gen: 9, natDexOnly: true},
    {slug: 'garchompitez', name: 'Garchompite Z', gen: 9, natDexOnly: true},
    {slug: 'glimmoranite', name: 'Glimmoranite', gen: 9, natDexOnly: true},
    {slug: 'golisopite', name: 'Golisopite', gen: 9, natDexOnly: true},
    {slug: 'golurkite', name: 'Golurkite', gen: 9, natDexOnly: true},
    {slug: 'greninjite', name: 'Greninjite', gen: 9, natDexOnly: true},
    {slug: 'hawluchanite', name: 'Hawluchanite', gen: 9, natDexOnly: true},
    {slug: 'heatranite', name: 'Heatranite', gen: 9, natDexOnly: true},
    {slug: 'lucarionitez', name: 'Lucarionite Z', gen: 9, natDexOnly: true},
    {slug: 'magearnite', name: 'Magearnite', gen: 9, natDexOnly: true},
    {slug: 'malamarite', name: 'Malamarite', gen: 9, natDexOnly: true},
    {slug: 'meganiumite', name: 'Meganiumite', gen: 9, natDexOnly: true},
    {slug: 'meowsticite', name: 'Meowsticite', gen: 9, natDexOnly: true},
    {slug: 'pyroarite', name: 'Pyroarite', gen: 9, natDexOnly: true},
    {slug: 'raichunitex', name: 'Raichunite X', gen: 9, natDexOnly: true},
    {slug: 'raichunitey', name: 'Raichunite Y', gen: 9, natDexOnly: true},
    {slug: 'scolipite', name: 'Scolipite', gen: 9, natDexOnly: true},
    {slug: 'scovillainite', name: 'Scovillainite', gen: 9, natDexOnly: true},
    {slug: 'scraftinite', name: 'Scraftinite', gen: 9, natDexOnly: true},
    {slug: 'skarmorite', name: 'Skarmorite', gen: 9, natDexOnly: true},
    {slug: 'staraptite', name: 'Staraptite', gen: 9, natDexOnly: true},
    {slug: 'starminite', name: 'Starminite', gen: 9, natDexOnly: true},
    {slug: 'tatsugirinite', name: 'Tatsugirinite', gen: 9, natDexOnly: true},
    {slug: 'victreebelite', name: 'Victreebelite', gen: 9, natDexOnly: true},
    {slug: 'zeraorite', name: 'Zeraorite', gen: 9, natDexOnly: true},
    {slug: 'zygardite', name: 'Zygardite', gen: 9, natDexOnly: true},

    // --- Z-Crystals (gen 7, and National Dex) ---
    {slug: 'aloraichiumz', name: 'Aloraichium Z', gen: 7, maxGen: 7},
    {slug: 'buginiumz', name: 'Buginium Z', gen: 7, maxGen: 7},
    {slug: 'darkiniumz', name: 'Darkinium Z', gen: 7, maxGen: 7},
    {slug: 'decidiumz', name: 'Decidium Z', gen: 7, maxGen: 7},
    {slug: 'dragoniumz', name: 'Dragonium Z', gen: 7, maxGen: 7},
    {slug: 'eeviumz', name: 'Eevium Z', gen: 7, maxGen: 7},
    {slug: 'electriumz', name: 'Electrium Z', gen: 7, maxGen: 7},
    {slug: 'fairiumz', name: 'Fairium Z', gen: 7, maxGen: 7},
    {slug: 'fightiniumz', name: 'Fightinium Z', gen: 7, maxGen: 7},
    {slug: 'firiumz', name: 'Firium Z', gen: 7, maxGen: 7},
    {slug: 'flyiniumz', name: 'Flyinium Z', gen: 7, maxGen: 7},
    {slug: 'ghostiumz', name: 'Ghostium Z', gen: 7, maxGen: 7},
    {slug: 'grassiumz', name: 'Grassium Z', gen: 7, maxGen: 7},
    {slug: 'groundiumz', name: 'Groundium Z', gen: 7, maxGen: 7},
    {slug: 'iciumz', name: 'Icium Z', gen: 7, maxGen: 7},
    {slug: 'inciniumz', name: 'Incinium Z', gen: 7, maxGen: 7},
    {slug: 'kommoniumz', name: 'Kommonium Z', gen: 7, maxGen: 7},
    {slug: 'lunaliumz', name: 'Lunalium Z', gen: 7, maxGen: 7},
    {slug: 'lycaniumz', name: 'Lycanium Z', gen: 7, maxGen: 7},
    {slug: 'marshadiumz', name: 'Marshadium Z', gen: 7, maxGen: 7},
    {slug: 'mewniumz', name: 'Mewnium Z', gen: 7, maxGen: 7},
    {slug: 'mimikiumz', name: 'Mimikium Z', gen: 7, maxGen: 7},
    {slug: 'normaliumz', name: 'Normalium Z', gen: 7, maxGen: 7},
    {slug: 'pikaniumz', name: 'Pikanium Z', gen: 7, maxGen: 7},
    {slug: 'pikashuniumz', name: 'Pikashunium Z', gen: 7, maxGen: 7},
    {slug: 'poisoniumz', name: 'Poisonium Z', gen: 7, maxGen: 7},
    {slug: 'primariumz', name: 'Primarium Z', gen: 7, maxGen: 7},
    {slug: 'psychiumz', name: 'Psychium Z', gen: 7, maxGen: 7},
    {slug: 'rockiumz', name: 'Rockium Z', gen: 7, maxGen: 7},
    {slug: 'snorliumz', name: 'Snorlium Z', gen: 7, maxGen: 7},
    {slug: 'solganiumz', name: 'Solganium Z', gen: 7, maxGen: 7},
    {slug: 'steeliumz', name: 'Steelium Z', gen: 7, maxGen: 7},
    {slug: 'tapuniumz', name: 'Tapunium Z', gen: 7, maxGen: 7},
    {slug: 'ultranecroziumz', name: 'Ultranecrozium Z', gen: 7, maxGen: 7},
    {slug: 'wateriumz', name: 'Waterium Z', gen: 7, maxGen: 7},
];

// A "Home"/national team isn't pinned to one game, so it gets everything;
// a version-pinned team gets only what that gen actually allows.
export function itemsFor(key: BattleFormatKey): PlaceholderItem[] {
    if (key === 'nationaldex') return PLACEHOLDER_ITEMS;
    return PLACEHOLDER_ITEMS.filter(item =>
        !item.natDexOnly && item.gen <= key && (item.maxGen ?? 9) >= key);
}
