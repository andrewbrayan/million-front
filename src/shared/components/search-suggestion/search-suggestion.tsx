import { Card, ListItemButton, ListItemText } from "@mui/material";
import useMapBox from "@shared/hooks/use-mapbox";
import type { Feature } from "@shared/services/geocoding.service";
import { useState } from "react";

import styles from "./search-suggestion.module.css";

interface Props {
  suggestion: Feature;
  onClickSuggestion: (suggestion: Feature) => void;
}

const SearchSuggestion: React.FC<Props> = ({
  suggestion,
  onClickSuggestion,
}) => {
  const { map } = useMapBox({
    center: suggestion.geometry.coordinates,
    centerPoint: true,
    zoom: 10,
  });
  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <ListItemButton
      key={suggestion.id}
      id={suggestion.id}
      component="li"
      onMouseOver={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
    >
      <ListItemText
        onClick={() => onClickSuggestion(suggestion)}
        primary={suggestion.properties.full_address}
      />
      <Card
        className={styles.suggestion__map}
        data-visibility={visibility}
        onClick={(e) => e.stopPropagation()}
      >
        {map}
      </Card>
    </ListItemButton>
  );
};

export default SearchSuggestion;
