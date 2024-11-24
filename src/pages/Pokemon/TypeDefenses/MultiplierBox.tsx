import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface IMultiplierBoxProps {
    mult: '0' | '2' | '4' | '1/2' | '1/4';
}

const MultiplierBox: FC<IMultiplierBoxProps> = ({ mult }) => {

    const StyledBox = styled(Box)<{ borderColor: string }>(({ theme, borderColor }) => ({
        border: '2px solid',
        display: 'flex',
        borderRadius: theme.spacing(1),
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: borderColor, // dynamic borderColor based on the 'mult' prop
    }));


    const StyledTypography = styled(Typography)<{ borderColor: string }>(({ borderColor }) => ({
        color: borderColor,
    }));


    const getBorderColor = (mult: IMultiplierBoxProps['mult']) => {
        switch (mult) {
            case '0':
                return '#2E3436';
            case '2':
                return '#4E9A06';
            case '4':
                return '#72D214';
            case '1/2':
                return '#A40001';
            case '1/4':
                return '#7C0000';
        }
    };

    return (
        <StyledBox borderColor={getBorderColor(mult)}>
            <StyledTypography borderColor={getBorderColor(mult)}>{mult}x</StyledTypography>
        </StyledBox>
    );
};

export default MultiplierBox;
