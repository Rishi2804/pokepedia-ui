import {AppBar, Button, Switch, styled, alpha} from "@mui/material";
import {COLORS} from "../../theme/styles/colors.ts";

export const Header = styled(AppBar)({
    height: 98,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${COLORS.BLACK}`,
    backgroundColor: COLORS.HEADER_GRAY,
    paddingRight: 30,
})

export const MenuButton = styled(Button)({
    color: 'white',
})

export const LightDarkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
        color: '#ffd000',
        '&:hover': {
            backgroundColor: alpha('#ffd000', theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
        backgroundColor: '#ffd000',
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#00a6ff',
        '&:hover': {
            backgroundColor: alpha('#00a6ff', theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#00a6ff',
    },
}))