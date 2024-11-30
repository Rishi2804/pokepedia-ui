import {MoveClass} from "../../global/enums.ts";
import {FC, SVGProps, useEffect, useState} from "react";

interface IMoveClassIconProps {
    mClass: MoveClass;
    size?: number;
}

const MoveClassIcon: FC<IMoveClassIconProps> = ({mClass, size}) => {
    const [MoveClassSVG, setMoveClassSVG] = useState<FC<SVGProps<SVGElement>> | null>(null)

    useEffect(() => {
        const loadSvg = async () => {
            try {
                const ReactComponent = await import(`./assets/${mClass}.svg`);
                setMoveClassSVG(() => ReactComponent.default);
            } catch (error) {
                console.error("Error loading SVG:", error);
            }
        };

        loadSvg()
    }, [mClass]);

    return (
        <>
            {MoveClassSVG && <MoveClassSVG width={size ?? 40} height={size ?? 40}/>}
        </>
    )

};

export default MoveClassIcon;