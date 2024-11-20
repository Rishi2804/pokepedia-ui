import {Header, LightDarkSwitch, MenuButton} from "./styles.ts";
import {Box, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const AppHeader: React.FC = () => {
    const navigate = useNavigate();

    const pagePaths: { [key: string]: string } = {
        'Pokedex': '/pokedex',
        'Moves': '/',
        'Abilities': '/',
        'Team Builder': '/',
    };

    const handleNavigation = (page: string) => {
        navigate(pagePaths[page]);
    }

    return (
        <Header position={"static"}>
            <Toolbar>
                <Typography variant="h1" sx={{paddingRight: 3, color: 'white'}}>
                    POKEPEDIA
                </Typography>
                <Box>
                    {
                        Object.keys(pagePaths).map(page => {
                            return (
                                <MenuButton
                                    key={page}
                                    onClick={() => handleNavigation(page)}
                                >
                                    {page}
                                </MenuButton>
                            )
                        })
                    }
                </Box>
            </Toolbar>
            <Box>
                <LightDarkSwitch />
                <Typography variant={"caption"}>Dark Mode</Typography>
            </Box>
        </Header>
    )
}

export default AppHeader