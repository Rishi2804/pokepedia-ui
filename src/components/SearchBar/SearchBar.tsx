import {FC, KeyboardEvent, useState} from "react";
import {useAutocomplete} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDebouncedValue} from "../../hooks/useDebouncedValue.ts";
import {useSearchSuggest} from "../../services/api/hooks/useSearch.ts";
import {SearchHit} from "../../global/types.ts";
import {searchHitPath} from "../../global/utils.ts";
import {Container, Dropdown, DropdownOption, OptionType, SearchInput} from "./styles.ts";

const TYPE_LABELS: Record<SearchHit["type"], string> = {
    pokemon: "Pokémon",
    move: "Move",
    ability: "Ability",
};

const SearchBar: FC = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebouncedValue(inputValue, 200);

    const {data} = useSearchSuggest(debouncedValue);
    const options = data ?? [];

    const blurInput = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const goToResultsPage = (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        setInputValue("");
        blurInput();
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    };

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        popupOpen,
    } = useAutocomplete({
        id: "site-search",
        options,
        getOptionLabel: (option) => option.name,
        filterOptions: (x) => x, // options are already server-ranked
        inputValue,
        // Ignore MUI's own "reset"/"selectOption" syncs, only real typing.
        onInputChange: (_, newValue, reason) => {
            if (reason === "input") setInputValue(newValue);
        },
        onChange: (_, value) => {
            if (value) {
                setInputValue("");
                blurInput();
                navigate(searchHitPath(value));
            }
        },
        clearOnBlur: false,
    });

    // Enter always searches, regardless of what's hover-highlighted.
    // getRootProps() (not getInputProps()) owns Enter-selects-highlighted,
    // and it'd still fire via bubbling without stopPropagation.
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.stopPropagation();
            event.preventDefault();
            goToResultsPage(inputValue);
        }
    };

    return (
        <Container {...getRootProps()}>
            <SearchInput
                {...getInputProps()}
                onKeyDown={handleKeyDown}
                placeholder="Search Pokémon, moves, abilities…"
            />
            {/* inputValue check: a cleared/disabled query keeps stale options via keepPreviousData */}
            {popupOpen && inputValue.trim() !== "" && options.length > 0 && (
                <Dropdown {...getListboxProps()}>
                    {(groupedOptions as SearchHit[]).map((option, index) => {
                        const {key, ...optionProps} = getOptionProps({option, index});
                        return (
                            <DropdownOption key={key} {...optionProps}>
                                <span>{option.name}</span>
                                <OptionType>{TYPE_LABELS[option.type]}</OptionType>
                            </DropdownOption>
                        );
                    })}
                </Dropdown>
            )}
        </Container>
    );
};

export default SearchBar;
