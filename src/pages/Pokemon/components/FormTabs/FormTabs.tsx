import {StyledTab, StyledTabs} from "./styles.tsx";
import {FC} from "react";

interface IFormTabsProps {
    forms: string[];
    i: number;
    setI: (i: number) => void;
    condensed?: boolean;
}

const FormTabs: FC<IFormTabsProps> = ({forms, i, setI, condensed}) => {
    if (forms.length <= 1) return null;

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setI(newValue)
    }

    return (
        <StyledTabs value={i} onChange={handleChange} condensed={condensed}>
            {
                forms.map((pokemon) => (
                    <StyledTab label={pokemon} key={pokemon}/>
                ))
            }
        </StyledTabs>
    )
}

export default FormTabs;