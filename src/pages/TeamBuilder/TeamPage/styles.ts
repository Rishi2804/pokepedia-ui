import {PokemonType} from "../../../global/enums.ts";
import {styled} from "@mui/system";
import {Box, InputBase, Paper, ToggleButton, Typography} from "@mui/material";
import {TypeToCardBorder, TypeToCardColor} from "../../../global/utils.ts";
import {COLORS} from "../../../theme/styles/colors.ts";
import InputLabel from "@mui/material/InputLabel";

interface CardProps {
    type1: PokemonType | null,
    type2: PokemonType | null,
    member?: boolean
}

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
    padding: 2,
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 3
}));

export const ShinyButton = styled(ToggleButton)(() => ({
    width: 30,
    height: 30,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
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
    backgroundColor: gender === 'male'
        ? COLORS.MALE
        : gender === 'female'
            ? COLORS.FEMALE
            : COLORS.GENDERLESS,
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

export const StaticLabel = styled(InputLabel)({
    color: COLORS.WHITE,
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
    },
    '& .MuiSvgIcon-root': {
        color: COLORS.WHITE,
    }
}))
//
// export const MoveInput = styled('input')({
//     backgroundColor: 'transparent',
//     border: `1px solid ${COLORS.WHITE}`,
//     color: COLORS.WHITE,
// })
//
// export const MoveListBox = styled('ul')({
//     // zIndex: 1,
// })