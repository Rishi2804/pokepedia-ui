import React from 'react';
import { MoveInfo } from '../../types.ts';
import * as S from './styles.ts';
import {Box} from "@mui/material";
import {COLORS} from "../../../../theme/styles/colors.ts";

interface MoveButtonProps {
  move: MoveInfo;
  onClick: () => void;
}
 // TODO: REMOVE HARDCODED TYPE
const MoveButton: React.FC<MoveButtonProps> = ({ move, onClick }) => (
  <S.MoveButtonStyled
    onClick={onClick}
    disabled={move.disabled}
    variant="outlined"
    size="small"
    // type={PokemonType.ELECTRIC}
  >
    <Box sx={{
      width: "100%",
      textAlign: "left"
    }}>
      <S.MoveNameText sx={{color: COLORS.WHITE}}>{move.move}</S.MoveNameText>
      <S.MovePPText sx={{color: COLORS.WHITE}}>
        {move.pp}/{move.maxpp} PP
      </S.MovePPText>
    </Box>
  </S.MoveButtonStyled>
);

export default MoveButton;
