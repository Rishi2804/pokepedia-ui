import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {COLORS} from "../../../../../theme/styles/colors.ts";

interface IRelationBoxProps {
    mult: '0' | '1' | '2' | '4' | '1/2' | '1/4';
}

const RelationBox: FC<IRelationBoxProps> = ({mult}) => {
    const getColor = (mult: IRelationBoxProps['mult']) => {
        switch (mult) {
            case '0':
                return '#808080';
            case '1/2':
                return '#4E9A06';
            case '1/4':
                return '#72D214';
            case '2':
                return '#A40001';
            case '4':
                return '#7C0000';
            default:
                return 'transparent'
        }
    };

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
            <Typography variant="h5" color={COLORS.WHITE}>{mult !== '1' && mult}</Typography>
        </Box>
    );
};

export default RelationBox;