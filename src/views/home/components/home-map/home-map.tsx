import { Box } from "@mui/material";
import { Marker } from "mapbox-gl";
import { useCallback, useEffect } from "react";
import { checkGeoPermission } from "@shared/utils/get-user-geo-permission";
import { getUserLocation } from "@shared/utils/get-user-location";
import { setPos } from "@core/store/actions/geo-location-coordinates.actions";
import type { Coord } from "@shared/services/geocoding.service";
import useMapBox from "@shared/hooks/use-mapbox";

import styles from "./home-map.module.css";

const HomeMap: React.FC = () => {
  const { mapRef, map } = useMapBox({});

  const fakePropertyPoints = (pos: Coord): Marker[] => {
    const getRandomPoint = () => {
      const randomLat = pos.lat + Math.random() * 0.15 - 0.1;
      const randomLng = pos.lng + Math.random() * 0.15 - 0.1;
      return { lat: randomLat, lng: randomLng };
    };

    return Array.from({ length: 20 }, () => {
      const marker = new Marker({ color: "red", draggable: false });
      marker.setLngLat(getRandomPoint());
      return marker;
    });
  };

  const navigateToUserLocation = useCallback(async () => {
    const mapCurrent = mapRef.current;
    if (!mapCurrent) return;
    const geoPermission = await checkGeoPermission();
    if (geoPermission !== "granted") return;
    const userLocation = await getUserLocation();
    setPos(userLocation);

    mapCurrent.flyTo({ center: userLocation });
    for (const element of fakePropertyPoints(userLocation)) {
      element.addTo(mapCurrent);
    }
  }, [mapRef]);

  useEffect(() => {
    navigateToUserLocation();
  }, [mapRef]);

  return <Box className={styles.home__map}>{map}</Box>;
};

export default HomeMap;
