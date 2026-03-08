import React from 'react';
import { MoveInfo } from '../types';
import * as S from '../styles';

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
    <S.MoveButtonContent>
      <S.MoveNameText>{move.move}</S.MoveNameText>
      <S.MovePPText>
        {move.pp}/{move.maxpp} PP
      </S.MovePPText>
    </S.MoveButtonContent>
  </S.MoveButtonStyled>
);

export default MoveButton;
