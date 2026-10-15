import {FC, useState} from "react";
import {Box} from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

interface ItemSpriteProps {
    // Object-store key from the API (e.g. "items/choice-scarf.png"); null/empty
    // shows the placeholder straight away.
    sprite: string | null | undefined;
    name: string;
    // Rendered square size in px. The source sprites are ~30px pixel art, so
    // they are scaled up without smoothing.
    size?: number;
}

const BASE_URL: string = `${import.meta.env.VITE_POKEMON_IMAGES_URL}`;

// Not every item has an image: the sprite key is a naming convention, and
// roughly a third of items (plus a handful of holdable ones, such as Mail and
// the Gen 2 berries) have no source image at all. A failed load falls back to
// a placeholder instead of a broken-image icon.
const ItemSprite: FC<ItemSpriteProps> = ({sprite, name, size = 32}) => {
    const [failedSprite, setFailedSprite] = useState<string | null>(null);

    if (!sprite || failedSprite === sprite) {
        return (
            <Box
                role="img"
                aria-label={name}
                sx={{
                    width: size, height: size, display: "inline-flex", flexShrink: 0,
                    alignItems: "center", justifyContent: "center", opacity: 0.35,
                }}
            >
                <CategoryOutlinedIcon sx={{fontSize: size * 0.7}}/>
            </Box>
        );
    }

    return (
        <img
            src={`${BASE_URL}/${sprite}`}
            alt={name}
            width={size}
            height={size}
            loading="lazy"
            onError={() => setFailedSprite(sprite)}
            style={{imageRendering: "pixelated", objectFit: "contain", flexShrink: 0}}
        />
    );
};

export default ItemSprite;
