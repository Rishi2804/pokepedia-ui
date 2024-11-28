import {Box, Typography} from "@mui/material";
import {Container, SectionButton} from "./styles.ts";
import {FC} from "react";

interface IQuickScrollProps {
    items: string[];
    heading: string;
}

const QuickScroll: FC<IQuickScrollProps> = ({ items, heading }) => {
    const handleSelectItem = (item: string) => {
        const element = document.getElementById(item);
        if (element) {
            element.scrollIntoView({ behavior: "instant" });
        }
    };

    if (items.length <= 1) return null

    return (
        <Container>
            <Typography variant="h5">{heading}</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
                {items.map((item, index) => (
                    <SectionButton
                        key={index}
                        variant="contained"
                        onClick={() => handleSelectItem(item)}
                    >
                        {item}
                    </SectionButton>
                ))}
            </Box>
        </Container>
    )
}

export default QuickScroll;