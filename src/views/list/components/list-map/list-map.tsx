import { Card } from "@mui/material";
import { useStore } from "@core/store/store";
import { useEffect, useMemo } from "react";
import { Marker } from "mapbox-gl";
import type { Property } from "@shared/services/property-api.service";
import useMapBox from "@shared/hooks/use-mapbox";

import styles from "./list-map.module.css";

interface Props {
  properties?: Property[];
}

const ListMap: React.FC<Props> = ({ properties }) => {
  const searchParams = useStore((state) => state.searchParams);
  const { map, mapRef } = useMapBox({
    center:
      searchParams?.lat && searchParams?.lng
        ? [searchParams.lng, searchParams.lat]
        : undefined,
    centerPoint: true,
    zoom: 12,
  });

  const currentCenter = useMemo<[number, number] | undefined>(() => {
    return searchParams?.lat && searchParams?.lng
      ? [searchParams.lng, searchParams.lat]
      : undefined;
  }, [searchParams?.lat && searchParams?.lng]);

  const createMarker = (property: Property) => {
    const marker = new Marker({
      color: "red",
      draggable: false,
    });
    marker.setLngLat({
      lat: property.latitude,
      lng: property.longitude,
    });
    return marker;
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !properties || properties.length === 0) return;
    properties.forEach((property) => {
      const marker = createMarker(property);
      marker.addTo(map);
    });
  }, [properties]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !currentCenter) return;
    map.flyTo({ center: currentCenter });
  }, [currentCenter]);

  return <Card className={styles.list__map}>{map}</Card>;
};

export default ListMap;
