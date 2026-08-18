import {FC} from "react";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import {SpriteFrame} from "./styles.ts";

interface PokemonSpriteProps {
    spriteId: number | null;
    shiny: boolean;
    female: boolean;
    fainted: boolean;
    size?: number;
    /** Mirrors the render so the two sides face each other - see the battle
     * plan's Phase 5 note (no back sprites exist, so both sides use the
     * same front-facing HOME render). */
    flip?: boolean;
}

// No sprite-resolution logic lives here - spriteId is already resolved
// server-side (view.ts's spriteIdFor). A null id just renders nothing
// rather than guessing a placeholder.
const PokemonSprite: FC<PokemonSpriteProps> = ({spriteId, shiny, female, fainted, size = 120, flip = false}) => {
    if (spriteId === null) return null;

    return (
        <SpriteFrame size={size} fainted={fainted} flip={flip}>
            <PokemonImg id={spriteId} shiny={shiny} female={female}/>
        </SpriteFrame>
    );
};

export default PokemonSprite;
