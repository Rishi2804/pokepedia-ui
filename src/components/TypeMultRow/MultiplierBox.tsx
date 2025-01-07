import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface IMultiplierBoxProps {
    mult: '0' | '2' | '4' | '1/2' | '1/4';
    size?: number;
}

const MultiplierBox: FC<IMultiplierBoxProps> = ({ mult, size }) => {

    const StyledBox = styled(Box)<{ borderColor: string }>(({ theme, borderColor }) => ({
        border: '2px solid',
        display: 'flex',
        borderRadius: theme.spacing(1),
        width: size ?? 45,
        height: size ?? 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: borderColor,
    }));


    const StyledTypography = styled(Typography)<{ borderColor: string }>(({ borderColor }) => ({
        color: borderColor,
    }));


    const getBorderColor = (mult: IMultiplierBoxProps['mult']) => {
        switch (mult) {
            case '0':
                return '#808080';
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
