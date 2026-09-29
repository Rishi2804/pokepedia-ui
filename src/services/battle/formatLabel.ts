// The server sends `format` as a raw Showdown format id, which may carry a
// `@@@` custom-rules suffix - short for the synthesized gen 1/2/3/5 Anything
// Goes formats, but ~870 characters for National Dex (it unbans each Legends:
// Z-A Mega Stone individually). None of that belongs on screen.
//
// National Dex and Legends: Z-A share the exact same `gen9nationaldexag`
// base (see formats.ts) - only their custom rules differ, so the base alone
// can't tell them apart. `Terastal Clause` only ever appears in the Z-A
// string (National Dex allows Tera), so it's used as the discriminator.
export function formatLabel(format: string): string {
    const base = format.split('@@@')[0];
    if (base === 'gen9nationaldexag') {
        return format.includes('Terastal Clause') ? 'Legends: Z-A Anything Goes' : 'National Dex Anything Goes';
    }

    const gen = /^gen(\d+)/.exec(base)?.[1];
    return gen ? `Gen ${gen} Anything Goes` : base;
}
