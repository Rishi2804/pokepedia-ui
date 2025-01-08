import {Stack, Typography} from "@mui/material";
import MetaData from "../components/MetaData/MetaData.tsx";

export const Home = () => {
    return (
        <>
            <MetaData pageTitle={"PokePedia"} />
            <Typography variant="h1" sx={{textAlign: 'center', my: 2}}>Welcome to PokePedia!</Typography>
            <Stack spacing={1}>
            <Typography>Welcome, Trainer! 🌟</Typography>
            <Typography>
                You've just arrived at the most comprehensive and up-to-date resource for everything Pokémon.
                Whether you're beginning your journey or striving to become a true Pokémon Master,
                this is the place to be!
            </Typography>
            <Typography>
                Explore every Pokémon, from their types and evolutions to their unique moves and abilities.
                Discover in-depth stats, battle strategies, and some fun facts you may not have known,
                including the latest from Pokémon Scarlet and Violet.
            </Typography>
            <Typography>
                Our encyclopedia is your go-to guide for everything you need to know to master the Pokémon universe.
            </Typography>
            <Typography>
                Get ready to catch ‘em all—knowledge and Pokémon alike!
            </Typography>
            </Stack>
        </>
    )
}