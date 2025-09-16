import { Container, Grid, Pagination, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStore } from "@core/store/store";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@shared/services/property-api.service";
import ListMap from "./components/list-map/list-map";

import styles from "./list.module.css";
import SearchSuggestions from "@shared/components/search-suggestions/search-suggestions";
import ListCard from "./components/list-card/list-card";
import { setSearchParams } from "@core/store/actions/search-params.actions";

const ListPage: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = useStore((state) => state.searchParams);
  const { data: properties } = useQuery({
    queryKey: ["search-geocodingService", JSON.stringify(searchParams)],
    queryFn: () => getProperties(searchParams),
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setSearchParams({ page: newPage });
  };

  const handlePropertyClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  return (
    <Container component="main" maxWidth="xl" className={styles.list}>
      <SearchSuggestions />
      <ListMap properties={properties?.items} />
      <Grid container spacing={2} className={styles.list__grid}>
        {properties && properties.items?.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ py: 4 }}
              color="text.secondary"
            >
              No hay propiedades para esta búsqueda.
            </Typography>
          </Grid>
        ) : (
          properties?.items?.map((property) => (
            <Grid key={property.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ListCard 
                property={property} 
                onOpen={handlePropertyClick}
              />
            </Grid>
          ))
        )}
      </Grid>
      {(properties?.totalPages ?? 0) > 1 && (
        <Pagination
          count={properties?.totalPages ?? 1}
          page={searchParams?.page ?? 1}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          sx={{ mx: "auto" }}
        />
      )}
    </Container>
  );
};

export default ListPage;
