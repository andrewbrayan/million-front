// components/property-card/PropertyCard.tsx
import * as React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaceIcon from "@mui/icons-material/Place";
import LaunchIcon from "@mui/icons-material/Launch";
import type { Property } from "@shared/services/property-api.service";

import styles from "./list-card.module.css";

enum OperationType {
  Rent = 0,
  Sale = 1,
}

interface Props {
  property: Property;
  onOpen?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const currencyCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const ListCard: React.FC<Props> = ({ property, onOpen, onFavorite }) => {
  const isRent = property.operationType === OperationType.Rent;

  const priceLabel = isRent
    ? `${currencyCOP.format(property.price)} / mes`
    : currencyCOP.format(property.price);

  return (
    <Card variant="outlined" className={styles.listCard}>
      <CardActionArea
        className={styles.listCard__container}
        onClick={() => onOpen?.(property.id)}
      >
        <Box className={styles.listCard__image}>
          <CardMedia
            component="img"
            height="180"
            image={property.image}
            alt={property.name}
          />

          <Box sx={{ position: "absolute", top: 12, left: 12 }}>
            <Chip
              label={isRent ? "Arriendo" : "Venta"}
              size="small"
              color={isRent ? "info" : "success"}
              sx={{ fontWeight: 600, borderRadius: 1 }}
            />
          </Box>

          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <Tooltip title="Guardar">
              <IconButton
                size="small"
                sx={{
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "background.paper" },
                  boxShadow: 1,
                }}
                onClick={(ev) => {
                  ev.preventDefault();
                  onFavorite?.(property.id);
                }}
              >
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent className={styles.listCard__content}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Typography variant="h6" fontWeight={800} lineHeight={1.2}>
              {priceLabel}
            </Typography>
            <Tooltip title="Ver en mapa">
              <IconButton
                size="small"
                onClick={(ev) => {
                  ev.preventDefault();
                  onOpen?.(property.id);
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            mt={0.75}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {property.name}
          </Typography>

          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            mt={1}
            mb={"auto"}
            color="text.secondary"
          >
            <PlaceIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" noWrap title={property.address}>
              {property.address}
            </Typography>
          </Stack>

          <Divider className={styles.listCard__divider} />

          <Stack direction="row" gap={1} flexWrap="wrap">
            <Chip
              size="small"
              variant="outlined"
              label={`Propietario: ${property.idOwner.slice(0, 6)}…`}
            />
            <Chip
              size="small"
              variant="outlined"
              label={`Lat: ${property.latitude.toFixed(
                3
              )}  Lng: ${property.longitude.toFixed(3)}`}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ListCard;
