import * as React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  FavoriteBorder,
  Place,
  Share,
  Phone,
  Email,
  Home,
  AttachMoney,
} from "@mui/icons-material";
import type { Property } from "@shared/services/property-api.service";

import styles from "./property-detail.module.css";

type PropertyDetailLoaderData = {
  property: Property;
};

enum OperationType {
  Rent = 0,
  Sale = 1,
}

const currencyCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const PropertyDetail: React.FC = () => {
  const navigate = useNavigate();
  const { property } = useLoaderData<PropertyDetailLoaderData>();
  const isRent = property.operationType === OperationType.Rent;

  const handleGoBack = () => {
    navigate("/list");
  };

  const priceLabel = isRent
    ? `${currencyCOP.format(property.price)} / mes`
    : currencyCOP.format(property.price);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.header}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          className={styles.backButton}
        >
          Volver
        </Button>

        <Stack direction="row" gap={1}>
          <Tooltip title="Guardar en favoritos">
            <IconButton className={styles.actionButton}>
              <FavoriteBorder />
            </IconButton>
          </Tooltip>
          <Tooltip title="Compartir">
            <IconButton className={styles.actionButton}>
              <Share />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card className={styles.imageCard}>
            <CardMedia
              component="img"
              height="400"
              image={property.image}
              alt={property.name}
              className={styles.mainImage}
            />
            <Box className={styles.imageOverlay}>
              <Chip
                label={isRent ? "Arriendo" : "Venta"}
                color={isRent ? "info" : "success"}
                className={styles.operationChip}
              />
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper className={styles.infoCard}>
            <CardContent>
              <Typography
                variant="h4"
                fontWeight={800}
                color="primary"
                gutterBottom
              >
                {priceLabel}
              </Typography>

              <Typography variant="h5" fontWeight={600} gutterBottom>
                {property.name}
              </Typography>

              <Stack direction="row" alignItems="center" gap={1} mb={2}>
                <Place color="action" />
                <Typography variant="body1" color="text.secondary">
                  {property.address}
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Tipo de operación
                  </Typography>
                  <Chip
                    label={isRent ? "Arriendo" : "Venta"}
                    color={isRent ? "info" : "success"}
                    variant="outlined"
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Propietario
                  </Typography>
                  <Typography variant="body2">{property.idOwner}</Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Coordenadas
                  </Typography>
                  <Typography variant="body2">
                    Lat: {property.latitude.toFixed(6)}
                    <br />
                    Lng: {property.longitude.toFixed(6)}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Phone />}
                  fullWidth
                >
                  Contactar Propietario
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Email />}
                  fullWidth
                >
                  Enviar Email
                </Button>
              </Stack>
            </CardContent>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper className={styles.detailsCard}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Detalles de la Propiedad
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box className={styles.detailItem}>
                    <Home color="primary" />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Tipo
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {isRent ? "Arriendo" : "Venta"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box className={styles.detailItem}>
                    <AttachMoney color="primary" />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Precio
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {priceLabel}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box className={styles.detailItem}>
                    <Place color="primary" />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Ubicación
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {property.address}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box className={styles.detailItem}>
                    <Home color="primary" />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        ID Propiedad
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {property.id}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyDetail;
