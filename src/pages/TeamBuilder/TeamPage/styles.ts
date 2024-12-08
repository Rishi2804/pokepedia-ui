import {PokemonType} from "../../../global/enums.ts";
import {styled} from "@mui/system";
import {Box, Button, darken, InputBase, Paper, TextField, ToggleButton} from "@mui/material";
import {TypeToCardBorder, TypeToCardColor} from "../../../global/utils.ts";
import {COLORS} from "../../../theme/styles/colors.ts";
import InputLabel from "@mui/material/InputLabel";

interface CardProps {
    type1: PokemonType | null,
    type2: PokemonType | null,
    member?: boolean
}

export const TeamNameInput = styled(TextField)({
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInputBase-input': {
        fontSize: '40px',
        fontWeight: 600,
        textAlign: 'center',
    },
})

export const Card = styled(Paper)<CardProps>(({ type1, type2, member }) => ({
    borderColor: type2 ? TypeToCardBorder[type2] : type1 ? TypeToCardBorder[type1] : "#67A090",
    backgroundColor: type1 ? TypeToCardColor[type1] : "#67A090",
    borderWidth: member ? 5 : 3,
    borderRadius: 5,
    borderStyle: "solid",
    display: "flex",
    padding: 1,
    flexDirection: "column",
    textAlign: "center",
    '&:hover': {
        cursor: "pointer",
    }
}));

export const MemberInfo = styled(Paper)<CardProps>(({ type1, type2 }) => ({
    borderColor: type2 ? TypeToCardBorder[type2] : type1 ? TypeToCardBorder[type1] : "#67A090",
    backgroundColor: type1 ? TypeToCardColor[type1] : "#67A090",
    borderWidth: 5,
    borderRadius: 5,
    borderStyle: "solid",
    display: "flex",
    paddingTop: 2,
    paddingBottom: 12,
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 3
}));

export const GridContainer = styled(Box)({
    width: '50%',
    display: "flex",
    padding: 1,
    flexDirection: "column",
});

export const ShinyButton = styled(ToggleButton)(() => ({
    width: 30,
    height: 30,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    borderWidth: 0,
    '&:disabled': {
        color: '#fff',
        borderWidth: 0,
    },
    '&.Mui-selected': {
        backgroundColor: "#EA6D24",
        color: '#fff',
        '&:hover': {
            backgroundColor: "#EA6D2480",
        }
    },
    '&:hover': {
        backgroundColor: "#EA6D2440",
    }
}))

interface GenderButtonProps {
    gender: 'male' | 'female' | 'genderless'
}

export const GenderButton = styled(ToggleButton)<GenderButtonProps>(({gender}) => ({
    width: 30,
    height: 30,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    borderWidth: 0,
    backgroundColor: gender === 'male'
        ? COLORS.MALE
        : gender === 'female'
            ? COLORS.FEMALE
            : COLORS.GENDERLESS,
    '&:disabled': {
        color: '#fff',
        borderWidth: 0,
    },
    '&:hover': {
        color: '#fff',
        backgroundColor: gender === 'male'
            ? COLORS.MALE
            : gender === 'female'
                ? COLORS.FEMALE
                : COLORS.GENDERLESS
    },
    '&.Mui-selected': {
        color: '#fff',
        backgroundColor: gender === 'male'
            ? COLORS.MALE
            : gender === 'female'
                ? COLORS.FEMALE
                : COLORS.GENDERLESS
    }
}))

export const TeraButton = styled(Button)({
    minWidth: 0,
    width: 30,
    height: 30,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    padding: 0,
})

export const StaticLabel = styled(InputLabel)({
    color: COLORS.WHITE,
    fontSize: '18px',
    '&.Mui-focused': {
        color: COLORS.WHITE,
    },
})

export const AbilityInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(1.5),
    },
    '& .MuiInputBase-input': {
        border: `1px solid ${COLORS.WHITE}`,
        fontSize: '18px',
        fontWeight: 600,
        color: COLORS.WHITE,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
    },
    '& .MuiSvgIcon-root': {
        color: COLORS.WHITE,
    },
    '&.Mui-disabled .MuiInputBase-input': {
        '-webkit-text-fill-color': COLORS.WHITE,
    },
}))

export const MoveInput = styled('input')<{ type?: PokemonType }>(({ type }) => ({
    backgroundColor: type ? TypeToCardColor[type] : 'transparent',
    border: `${type ? "3px" : "1px"} solid ${type ? TypeToCardBorder[type] : COLORS.WHITE}`,
    color: COLORS.WHITE,
    borderRadius: 3,
    width: '100%',
    height: 39,
    fontSize: '18px',
    fontWeight: 600,
    padding: 15,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
}))

export const MoveListBox = styled('ul')({
    zIndex: 2,
    overflow: 'scroll',
    width: 170,
    position: 'absolute',
    listStyle: 'none',
    textAlign: 'left',
    margin: 0,
    padding: 0,
    fontSize: '18px',
    fontWeight: 600,
    color: COLORS.WHITE,
    maxHeight: 200
})

export const MoveOption = styled('li')<{ type: PokemonType }>(({ type }) => ({
    backgroundColor: TypeToCardColor[type],
    padding: 7,
    '&.Mui-focused': {
        backgroundColor: darken(TypeToCardColor[type], 0.1),
        color: 'white',
        cursor: 'pointer',
    },
    '&:active': {
        backgroundColor: darken(TypeToCardColor[type], 0.3),
        color: 'white',
    },
}))