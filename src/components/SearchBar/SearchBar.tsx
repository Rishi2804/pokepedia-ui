import {FC, KeyboardEvent, useRef, useState} from "react";
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
    // Set by onChange when Enter selects a highlighted suggestion, so the
    // same keypress doesn't also fall through to the full-results-page
    // navigation below.
    const justSelectedRef = useRef(false);

    const {data} = useSearchSuggest(debouncedValue);
    const options = data ?? [];

    // Blur after navigating: keepPreviousData means useSearchSuggest keeps
    // showing the last successful list once the query clears to empty (a
    // cleared/disabled query never resolves to replace it), so without this
    // the dropdown stays open over whatever page we just navigated to.
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
        // Only "input" is the user actually typing. MUI also fires this with
        // "reset"/"selectOption" to sync displayed text to the chosen
        // option's label after a selection, which would overwrite the
        // setInputValue("") below with the option's own name.
        onInputChange: (_, newValue, reason) => {
            if (reason === "input") setInputValue(newValue);
        },
        onChange: (_, value) => {
            if (value) {
                justSelectedRef.current = true;
                setInputValue("");
                blurInput();
                navigate(searchHitPath(value));
            }
        },
        clearOnBlur: false,
    });

    const {onKeyDown: autocompleteKeyDown, ...inputProps} = getInputProps();

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        autocompleteKeyDown?.(event);
        if (event.key === "Enter") {
            if (justSelectedRef.current) {
                justSelectedRef.current = false;
                return;
            }
            goToResultsPage(inputValue);
        }
    };

    return (
        <Container {...getRootProps()}>
            <SearchInput
                {...inputProps}
                onKeyDown={handleKeyDown}
                placeholder="Search Pokémon, moves, abilities…"
            />
            {popupOpen && options.length > 0 && (
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
