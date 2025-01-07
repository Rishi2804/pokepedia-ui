import {Header, LightDarkSwitch, MenuButton} from "./styles.ts";
import {Box, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useThemeContext} from "../../theme/context/ThemeContext.tsx";

const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const { toggleTheme } = useThemeContext();

    const pagePaths: { [key: string]: string } = {
        'Pokedex': '/pokedex',
        'Moves': '/attackdex',
        'Abilities': '/ability',
        'Types': '/types',
        'Team Builder': '/team-builder',
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
                <LightDarkSwitch
                    onChange={toggleTheme}
                />
                <Typography variant={"caption"}>Dark Mode</Typography>
            </Box>
        </Header>
    )
}

export default AppHeader