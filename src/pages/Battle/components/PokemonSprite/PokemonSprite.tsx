import {FC} from "react";
import type {BattleSprite} from "../../../../services/battle/protocol.ts";
import {SpriteFrame} from "./styles.ts";

interface PokemonSpriteProps {
    sprite: BattleSprite;
    name: string;
    side: 'p1' | 'p2';
    fainted: boolean;
    size?: number;
}

const PokemonSprite: FC<PokemonSpriteProps> = ({sprite, name, side, fainted, size = 120}) => (
    <SpriteFrame size={size} fainted={fainted} pixelated={sprite.pixelated} scale={sprite.scale} side={side}>
        <img src={sprite.url} alt={name} width={sprite.w} height={sprite.h}/>
    </SpriteFrame>
);

export default PokemonSprite;
