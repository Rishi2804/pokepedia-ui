import {Sprites} from '@pkmn/img';
import type {DynamaxState} from './protocol.ts';

const DOMAIN = import.meta.env.VITE_SHOWDOWN_SPRITES_DOMAIN as string;

export interface BattleSprite {
    url: string;
    w: number;
    h: number;
    pixelated: boolean;
    /** Extra on-screen enlargement for Dynamax/Gigantamax (1 otherwise). */
    scale: number;
}

// Showdown (battle-dex.ts getSpriteData) doubles a Dynamaxed sprite but not a
// Gigantamaxed one, because its Gmax art is already drawn far larger. Here
// every sprite is contained in a fixed box (which cancels that larger
// canvas), so Gmax needs an enlargement of its own too.
const DYNAMAX_SCALE = 1.8;
const GIGANTAMAX_SCALE = 1.5;

export function battleSprite(speciesForme: string, opts: {
    side: 'p1' | 'p2';
    shiny: boolean;
    gender: 'M' | 'F' | 'N';
    gen: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    dynamax?: DynamaxState | null;
}): BattleSprite {
    // While Gigantamaxed, Showdown swaps to the "<forme>-Gmax" sprite.
    const forme = opts.dynamax === 'gigantamax' && !speciesForme.endsWith('-Gmax') ? `${speciesForme}-Gmax` : speciesForme;
    const scale = opts.dynamax === 'gigantamax' ? GIGANTAMAX_SCALE : opts.dynamax === 'dynamax' ? DYNAMAX_SCALE : 1;
    const sprite = Sprites.getPokemon(forme, {
        side: opts.side,
        shiny: opts.shiny,
        gender: opts.gender,
        gen: opts.gen,
        domain: DOMAIN,
        protocol: 'http',
    });
    return {...sprite, scale};
}
