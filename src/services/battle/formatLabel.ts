// The server sends `format` as a raw Showdown format id, which may carry a
// `@@@` custom-rules suffix - short for the synthesized gen 1/2/3/5 Anything
// Goes formats, but ~870 characters for National Dex (it unbans each Legends:
// Z-A Mega Stone individually). None of that belongs on screen.
export function formatLabel(format: string): string {
    const base = format.split('@@@')[0];
    if (base === 'gen9nationaldexag') return 'National Dex Anything Goes';

    const gen = /^gen(\d+)/.exec(base)?.[1];
    return gen ? `Gen ${gen} Anything Goes` : base;
}
