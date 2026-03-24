import React from 'react';
import { Button, useTheme } from '@mui/material';
import { MoveInfo, Pokemon, PlayerState } from '../../types.ts';
import * as S from './styles.ts';
import MoveButton from '../MoveButton/MoveButton.tsx';

interface ControlsPanelProps {
  activeMoves: MoveInfo[] | undefined;
  isForceSwitch: boolean;
  currentPlayer: 'p1' | 'p2';
  currentPlayerState: PlayerState;
  availableSwitches: Pokemon[];
  onMoveClick: (choice: string) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
                                                       activeMoves,
                                                       isForceSwitch,
                                                       currentPlayer,
                                                       currentPlayerState,
                                                       availableSwitches,
                                                       onMoveClick,
                                                     }) => {
  const theme = useTheme();

  return (
      <S.ControlsSection>
        {/* Force-switch hides the move grid entirely */}
        {!isForceSwitch && (
            <>
              {activeMoves && activeMoves.length > 0 ? (
                  <>
                    <S.ControlLabel>
                      MOVES — {currentPlayer.toUpperCase()} · {currentPlayerState.active?.name || '???'}
                    </S.ControlLabel>
                    <S.MoveGrid>
                      {activeMoves.map((move, i) => (
                          <MoveButton
                              key={i}
                              move={move}
                              onClick={() => onMoveClick(`move ${i + 1}`)}
                          />
                      ))}
                    </S.MoveGrid>
                  </>
              ) : (
                  <>
                    <S.ControlLabel>MOVES — {currentPlayer.toUpperCase()}</S.ControlLabel>
                    <S.MoveGrid>
                      {[1, 2, 3, 4].map(n => (
                          <Button
                              key={n}
                              variant="outlined"
                              size="small"
                              onClick={() => onMoveClick(`move ${n}`)}
                              sx={{
                                width: '100%',
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.divider,
                                textTransform: 'none',
                                '&:hover': {
                                  borderColor: theme.palette.primary.main,
                                  color: theme.palette.primary.main,
                                },
                              }}
                          >
                            Move {n}
                          </Button>
                      ))}
                    </S.MoveGrid>
                  </>
              )}
            </>
        )}

        {(isForceSwitch || availableSwitches.length > 0) && (
            <>
              <S.ControlLabel>
                {isForceSwitch ? 'CHOOSE A POKÉMON TO SEND OUT' : 'SWITCHES'}
              </S.ControlLabel>
              <S.SwitchesContainer>
                {availableSwitches.map((poke, i) => {
                  const slotIndex = currentPlayerState.team.indexOf(poke) + 1;
                  return (
                      <S.SwitchButton
                          key={i}
                          variant="outlined"
                          size="small"
                          onClick={() => onMoveClick(`switch ${slotIndex}`)}
                      >
                        ↔ {poke.name} ({poke.hpPercent}%)
                      </S.SwitchButton>
                  );
                })}
              </S.SwitchesContainer>
            </>
        )}
      </S.ControlsSection>
  );
};

export default ControlsPanel;