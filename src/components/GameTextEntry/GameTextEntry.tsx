import {EntryBox, GameBox, GroupGameBox, TextBox} from "./styles.ts";
import {Typography} from "@mui/material";
import {Game} from "../../global/enums.ts";
import {FC} from "react";

interface IGameTextEntryProps {
    games: Game[];
    entry: string;
}

const GameTextEntry: FC<IGameTextEntryProps> = ({games, entry}) => {
    return (
        <EntryBox>
            <GroupGameBox>
                {
                    games.map((game, index) => (
                        <GameBox game={game} key={index}>
                            <Typography variant="body2">{game}</Typography>
                        </GameBox>
                    ))
                }
            </GroupGameBox>
            <TextBox>
                <Typography>{entry}</Typography>
            </TextBox>
        </EntryBox>
    );
};

export default GameTextEntry;