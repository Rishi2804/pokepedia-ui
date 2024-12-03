import {Game, PokedexRegion} from "../../../../global/enums.ts";

export interface IDexEntry {
    game: Game;
    entry: string;
}

export interface IDexNum {
    dexName: PokedexRegion;
    dexNumber: number;
}