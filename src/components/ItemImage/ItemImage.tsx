import {FC, useState} from "react";
import {Box} from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

interface ItemImageProps {
    // Object-store key from the API (e.g. "items/choice-scarf.png"); null/empty
    // shows the placeholder straight away.
    image: string | null | undefined;
    name: string;
    // Rendered square size in px.
    size?: number;
}

const BASE_URL: string = `${import.meta.env.VITE_POKEMON_IMAGES_URL}`;

// Images up to this wide are the ~30px pixel art from PokeAPI's sprite set,
// which looks right scaled up with hard pixels. Wider ones (Bulbapedia's
// 128-160px bag images) are shrunk to fit, and nearest-neighbour shrinking
// makes them jagged, so those use normal smoothing.
const PIXEL_ART_MAX_WIDTH = 64;

// Not every item has an image: the image key is a naming convention, and
// roughly one in six items (plus a handful of holdable ones, such as Mail and
// the Gen 2 berries) have no source image at all. A failed load falls back to
// a placeholder instead of a broken-image icon.
const ItemImage: FC<ItemImageProps> = ({image, name, size = 32}) => {
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const [pixelArt, setPixelArt] = useState(true);

    if (!image || failedImage === image) {
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
            src={`${BASE_URL}/${image}`}
            alt={name}
            width={size}
            height={size}
            loading="lazy"
            onLoad={e => setPixelArt(e.currentTarget.naturalWidth <= PIXEL_ART_MAX_WIDTH)}
            onError={() => setFailedImage(image)}
            style={{imageRendering: pixelArt ? "pixelated" : "auto", objectFit: "contain", flexShrink: 0}}
        />
    );
};

export default ItemImage;
