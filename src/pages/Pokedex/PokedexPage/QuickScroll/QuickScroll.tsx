import {Box, Typography} from "@mui/material";
import {Container, SectionButton} from "./styles.ts";

const QuickScroll = ({ dexes }: {dexes: string[]}) => {
    const handleSelectDex = (dex: string) => {
        const element = document.getElementById(dex);
        if (element) {
            element.scrollIntoView({ behavior: "instant" });
        }
    };

    if (dexes.length <= 1) return null

    return (
        <Container>
            <Typography variant="h5">Jump to:</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
                {dexes.map((dex, index) => (
                    <SectionButton
                        key={index}
                        variant="contained"
                        onClick={() => handleSelectDex(dex)}
                    >
                        {dex}
                    </SectionButton>
                ))}
            </Box>
        </Container>
    )
}

export default QuickScroll;