import {
  Box,
  Card,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { setSearchParams } from "@core/store/actions/search-params.actions";
import { useStore } from "@core/store/store";
import HomeMap from "./components/home-map/home-map";

import styles from "./home.module.css";
import SearchSuggestions from "@shared/components/search-suggestions/search-suggestions";

const HomePage: React.FC = () => {
  const propertyOperationType = useStore(
    (state) => state.searchParams?.propertyOperationType
  );

  const handleOperationTypeChange = (
    event: React.MouseEvent,
    value: number
  ) => {
    event.preventDefault();
    setSearchParams({
      propertyOperationType: value,
    });
  };

  return (
    <Container component="main" maxWidth="xl" className={styles.home}>
      <Box className={styles.home__backdrop} />
      <HomeMap />
      <Card className={styles.home__card}>
        <ToggleButtonGroup
          exclusive
          color="primary"
          value={propertyOperationType}
          onChange={handleOperationTypeChange}
        >
          <ToggleButton value={1}>Arrendar</ToggleButton>
          <ToggleButton value={2}>Comprar</ToggleButton>
        </ToggleButtonGroup>
        <SearchSuggestions />
      </Card>
    </Container>
  );
};

export default HomePage;
