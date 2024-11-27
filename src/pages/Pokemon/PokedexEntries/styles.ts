import {styled} from "@mui/system";
import {Box, Typography} from "@mui/material";
import {TypeToCardBorder, TypeToCardColor} from "../../../global/utils.ts";
import {Game, PokemonType} from "../../../global/enums.ts";
import {gameToColorMap, gameToTextColor, genToColorMap, regionToColorMap} from "./constants.ts";

interface ContainerProps {
    type1: PokemonType;
    type2: PokemonType | null;
}

export const EntriesContainer = styled(Box)<ContainerProps>(({type1, type2}) => ({
    backgroundColor: TypeToCardColor[type1],
    border: `4px solid ${type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1]}`,
    borderRadius: '5px',
    padding: 8,
}))

interface GenContainerProps {
    gen: number;
}

export const GenEntriesContainer = styled(Box)<GenContainerProps>(({gen}) => ({
    width: '100%',
    padding: 4,
    backgroundColor: genToColorMap[gen],
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
}))

interface UpperCardContainerProps {
    gen?: number;
    region?: string;
}

export const UpperCardContainer = styled(Box)<UpperCardContainerProps>(({gen, region}) => ({
    width: '10%',
    backgroundColor: gen ? genToColorMap[gen] : region ? regionToColorMap[region] : "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex',
}))

export const UpperCardText = styled(Typography)({
    color: 'black',
    fontWeight: 500,
})


export const EntryBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 13,
    display: 'flex',
}))

export const TextBox = styled(Box)(({theme}) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 5,
    border: `1px solid ${theme.palette.primaryBorder}`,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
}))

interface GameBoxProps {
    game: Game
}

export const GameBox = styled(Box)<GameBoxProps>(({game}) => ({
    width: '12%',
    backgroundColor: gameToColorMap[game],
    color: gameToTextColor[game],
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
}))

export const EmptyBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    border: `1px solid ${theme.palette.primaryBorder}`,
    borderRadius: 13,
}))