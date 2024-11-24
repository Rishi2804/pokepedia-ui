import {styled} from "@mui/system";
import {Stack} from "@mui/material";

interface IInfoSectionProps {
    children?: React.ReactNode;
}

export const InfoSection = styled((props: IInfoSectionProps) =>
    <Stack direction="row" spacing={4} {...props} />
)({
    padding: '10px 0px 10px 5px',
    alignItems: "center"
});