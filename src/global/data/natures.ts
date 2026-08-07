import type {StatKey} from "../types.ts";

// Straight transcription of ../pokemon-showdown/data/natures.ts, keyed and
// shaped the same way so a NatureName round-trips through Showdown untouched.
export type NatureName =
    | 'adamant' | 'bashful' | 'bold' | 'brave' | 'calm' | 'careful' | 'docile'
    | 'gentle' | 'hardy' | 'hasty' | 'impish' | 'jolly' | 'lax' | 'lonely'
    | 'mild' | 'modest' | 'naive' | 'naughty' | 'quiet' | 'quirky' | 'rash'
    | 'relaxed' | 'sassy' | 'serious' | 'timid';

export interface Nature {
    name: string;
    plus?: Exclude<StatKey, 'hp'>;
    minus?: Exclude<StatKey, 'hp'>;
}

export const NATURES: Record<NatureName, Nature> = {
    adamant: {name: "Adamant", plus: 'atk', minus: 'spa'},
    bashful: {name: "Bashful"},
    bold: {name: "Bold", plus: 'def', minus: 'atk'},
    brave: {name: "Brave", plus: 'atk', minus: 'spe'},
    calm: {name: "Calm", plus: 'spd', minus: 'atk'},
    careful: {name: "Careful", plus: 'spd', minus: 'spa'},
    docile: {name: "Docile"},
    gentle: {name: "Gentle", plus: 'spd', minus: 'def'},
    hardy: {name: "Hardy"},
    hasty: {name: "Hasty", plus: 'spe', minus: 'def'},
    impish: {name: "Impish", plus: 'def', minus: 'spa'},
    jolly: {name: "Jolly", plus: 'spe', minus: 'spa'},
    lax: {name: "Lax", plus: 'def', minus: 'spd'},
    lonely: {name: "Lonely", plus: 'atk', minus: 'def'},
    mild: {name: "Mild", plus: 'spa', minus: 'def'},
    modest: {name: "Modest", plus: 'spa', minus: 'atk'},
    naive: {name: "Naive", plus: 'spe', minus: 'spd'},
    naughty: {name: "Naughty", plus: 'atk', minus: 'spd'},
    quiet: {name: "Quiet", plus: 'spa', minus: 'spe'},
    quirky: {name: "Quirky"},
    rash: {name: "Rash", plus: 'spa', minus: 'spd'},
    relaxed: {name: "Relaxed", plus: 'def', minus: 'spe'},
    sassy: {name: "Sassy", plus: 'spd', minus: 'spe'},
    serious: {name: "Serious"},
    timid: {name: "Timid", plus: 'spe', minus: 'atk'},
};
