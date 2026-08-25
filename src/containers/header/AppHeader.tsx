import {Header, LightDarkSwitch, MenuButton} from "./styles.ts";
import {Box, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";
import {MouseEvent, useState} from "react";
import {useThemeContext} from "../../theme/context/ThemeContext.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";

const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const { toggleTheme } = useThemeContext();
    const theme = useTheme();
    // Below this, the nav buttons no longer fit in one row.
    const isCompact = useMediaQuery(theme.breakpoints.down('md'));
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

    const pagePaths: { [key: string]: string } = {
        'Pokedex': '/pokedex',
        'Moves': '/attackdex',
        'Abilities': '/ability',
        'Types': '/types',
        'Team Builder': '/team-builder',
        'Battle': '/battle',
    };

    const handleNavigation = (page: string) => {
        navigate(pagePaths[page]);
        setMenuAnchor(null);
    }

    const openMenu = (event: MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    }

    return (
        <Header position={"static"}>
            <Toolbar>
                <Typography variant="h1" sx={{paddingRight: 3, color: 'white'}}>
                    POKEPEDIA
                </Typography>
                {isCompact ? (
                    <>
                        <IconButton onClick={openMenu} sx={{color: 'white'}} aria-label="Open navigation menu">
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
                            {
                                Object.keys(pagePaths).map(page => (
                                    <MenuItem key={page} onClick={() => handleNavigation(page)}>
                                        {page}
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </>
                ) : (
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
                )}
            </Toolbar>
            <SearchBar />
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <LightDarkSwitch
                    onChange={toggleTheme}
                />
                <Typography variant={"caption"} sx={{display: {xs: 'none', sm: 'block'}}}>Dark Mode</Typography>
            </Box>
        </Header>
    )
}

export default AppHeader
