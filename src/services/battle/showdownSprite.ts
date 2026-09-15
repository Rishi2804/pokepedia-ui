import {Sprites} from '@pkmn/img';

const DOMAIN = import.meta.env.VITE_SHOWDOWN_SPRITES_DOMAIN as string;

export interface BattleSprite {
    url: string;
    w: number;
    h: number;
    pixelated: boolean;
}

export function battleSprite(speciesForme: string, opts: {
    side: 'p1' | 'p2';
    shiny: boolean;
    gender: 'M' | 'F' | 'N';
    gen: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}): BattleSprite {
    return Sprites.getPokemon(speciesForme, {
        side: opts.side,
        shiny: opts.shiny,
        gender: opts.gender,
        gen: opts.gen,
        domain: DOMAIN,
        protocol: 'http',
    });
}
