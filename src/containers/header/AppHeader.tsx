import {Header, MenuButton, Search, SearchIconWrapper, StyledInputBase} from "./styles.ts";
import {Box, Toolbar, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
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
                <Typography variant="h4" sx={{paddingRight: 3}}>
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
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </Header>
    )
}

export default AppHeader