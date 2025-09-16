import { useState } from "react";
import { Box, Card, List, OutlinedInput } from "@mui/material";
import {
  geocodingService,
  type Feature,
} from "@shared/services/geocoding.service";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchParams } from "@core/store/actions/search-params.actions";
import SearchSuggestion from "../search-suggestion/search-suggestion";

import styles from "./search-suggestions.module.css";

const SearchSuggestions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: searchSuggestions } = useQuery({
    queryKey: ["search-geocodingService", debouncedSearch],
    queryFn: () => geocodingService(debouncedSearch),
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (suggestion: Feature) => {
    setSearchParams({
      lat: suggestion.properties.coordinates.latitude,
      lng: suggestion.properties.coordinates.longitude,
    });
    setSearch("");
    if (location.pathname !== "/list") {
      navigate("/list");
    }
  };

  return (
    <Box className={styles.suggestions}>
      <OutlinedInput
        placeholder="Buscar por dirección, barrio o ciudad"
        startAdornment={<SearchIcon fontSize="large" />}
        onChange={handleSearchChange}
        fullWidth
      />
      {searchSuggestions && searchSuggestions.length > 0 && (
        <Card className={styles.suggestions__card}>
          <List>
            {searchSuggestions.map((suggestion) => (
              <SearchSuggestion
                key={suggestion.id}
                suggestion={suggestion}
                onClickSuggestion={handleSubmit}
              />
            ))}
          </List>
        </Card>
      )}
    </Box>
  );
};

export default SearchSuggestions;
