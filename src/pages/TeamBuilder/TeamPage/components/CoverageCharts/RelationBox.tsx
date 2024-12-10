import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {COLORS} from "../../../../../theme/styles/colors.ts";
import StrengthIcon from '@mui/icons-material/Check';
import WeaknessIcon from '@mui/icons-material/Close';
import ImmunityIcon from '@mui/icons-material/DoNotDisturb';


interface IRelationBoxProps {
    mult: '0' | '1' | '2' | '4' | '1/2' | '1/4';
    coverage?: boolean;
}

const RelationBox: FC<IRelationBoxProps> = ({mult, coverage}) => {
    const getColor = (mult: IRelationBoxProps['mult']) => {
        switch (mult) {
            case '0':
                return '#808080';
            case '1/2':
                return coverage ? '#A40001' : '#4E9A06';
            case '1/4':
                return '#72D214';
            case '2':
                return coverage ? '#4E9A06' : '#A40001';
            case '4':
                return '#7C0000';
            default:
                return 'transparent'
        }
    };

    const getIcon = (mult: IRelationBoxProps['mult']) => {
        switch (mult) {
            case '0':
                return <ImmunityIcon />;
            case '1/2':
                return <WeaknessIcon />;
            case '2':
                return <StrengthIcon />;
            default:
                return null
        }
    }

    return (
        <Box sx={{
            color: "#fff",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
            borderRadius: 2,
            width: 40,
            backgroundColor: getColor(mult),
            height: 40
        }}>
            {!coverage && <Typography variant="h5" color={COLORS.WHITE}>{mult !== '1' && mult}</Typography>}
            {coverage && getIcon(mult)}
        </Box>
    );
};

export default RelationBox;