import {styled} from "@mui/system";
import {Box} from "@mui/material";
import {Game} from "../../global/enums.ts";
import {gameToColorMap, gameToTextColor} from "../../pages/Pokemon/components/PokedexEntries/constants.ts";

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

export const GroupGameBox = styled(Box)(() => ({
    width: '12%',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    overflow: 'hidden',
}))

export const GameBox = styled(Box)<{ game: Game }>(({game}) => ({
    width: '100%',
    height: '100%',
    backgroundColor: gameToColorMap[game],
    color: gameToTextColor[game],
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))