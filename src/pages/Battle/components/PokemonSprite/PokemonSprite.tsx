import {FC} from "react";
import {battleSprite} from "../../../../services/battle/showdownSprite.ts";
import type {DynamaxState} from "../../../../services/battle/protocol.ts";
import {SpriteFrame} from "./styles.ts";

interface PokemonSpriteProps {
    speciesForme: string;
    side: 'p1' | 'p2';
    shiny: boolean;
    gender: 'M' | 'F' | 'N';
    fainted: boolean;
    dynamax?: DynamaxState | null;
    gen: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    size?: number;
}

const PokemonSprite: FC<PokemonSpriteProps> = ({speciesForme, side, shiny, gender, fainted, dynamax, gen, size = 120}) => {
    const sprite = battleSprite(speciesForme, {side, shiny, gender, gen, dynamax});

    return (
        <SpriteFrame size={size} fainted={fainted} pixelated={sprite.pixelated} scale={sprite.scale} side={side}>
            <img src={sprite.url} alt={speciesForme} width={sprite.w} height={sprite.h}/>
        </SpriteFrame>
    );
};

export default PokemonSprite;
