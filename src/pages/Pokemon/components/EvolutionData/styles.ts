import {styled} from "@mui/system";
import {Box} from "@mui/material";

export const PokemonBox = styled(Box)({
    display: 'flex',
    width: '150px',
    flexDirection: 'column',
})

export const StepBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

export const LinesContainer = styled(Box)({
    display: 'flex',
    overflow: 'scroll',
    justifyContent: 'center',
    flexDirection: 'column',
})