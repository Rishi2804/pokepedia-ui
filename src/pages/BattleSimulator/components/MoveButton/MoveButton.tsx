import React from 'react';
import { MoveInfo } from '../../types.ts';
import * as S from './styles.ts';
import { Box } from "@mui/material";

interface MoveButtonProps {
  move: MoveInfo;
  onClick: () => void;
}

const MoveButton: React.FC<MoveButtonProps> = ({ move, onClick }) => (
    <S.MoveButtonStyled
        onClick={onClick}
        disabled={move.disabled}
        variant="outlined"
        size="small"
    >
      <Box sx={{ width: "100%", textAlign: "left" }}>
        <S.MoveNameText>{move.move}</S.MoveNameText>
        <S.MovePPText>{move.pp}/{move.maxpp} PP</S.MovePPText>
      </Box>
    </S.MoveButtonStyled>
);

export default MoveButton;