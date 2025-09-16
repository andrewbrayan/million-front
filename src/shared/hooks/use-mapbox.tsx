import { useEffect, useMemo, useRef } from "react";
import { getEnvironment } from "@core/store/actions/environments.action";
import { useStore } from "@core/store/store";
import { ThemeModeEnum } from "@core/store/actions/theme.actions";
import { BOGOTA_POS } from "@shared/services/geocoding.service";
import { getSystemTheme } from "@shared/utils/get-system-theme";
import mapboxgl from "mapbox-gl";

interface Props {
  center?: [number, number];
  zoom?: number;
  centerPoint?: boolean;
}

interface UseMapboxReturn {
  mapRef: React.RefObject<mapboxgl.Map | null>;
  map: React.ReactNode;
}

const useMapBox = ({ center, zoom, centerPoint }: Props): UseMapboxReturn => {
  const theme = useStore((s) => s.theme);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const styleUrl = useMemo(() => {
    const resolved = theme === ThemeModeEnum.SYSTEM ? getSystemTheme() : theme;
    return resolved === ThemeModeEnum.LIGHT
      ? "mapbox://styles/mapbox/navigation-day-v1"
      : "mapbox://styles/mapbox/navigation-night-v1";
  }, [theme]);

  const centerPointMarker = useMemo(() => {
    if (!centerPoint || !center) return null;
    const marker = new mapboxgl.Marker({ color: "blue", draggable: false });
    marker.setLngLat({ lat: center[1], lng: center[0] });
    return marker;
  }, [centerPoint, center]);

  useEffect(() => {
    mapboxgl.accessToken = getEnvironment("mapboxAccessToken");
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: styleUrl,
      center: center ?? [BOGOTA_POS.lat, BOGOTA_POS.lng],
      zoom: zoom ?? 12,
    });
    map.on("load", () => {
      map.resize();
      if (centerPointMarker) centerPointMarker.addTo(map);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const mapCurrent = mapRef.current;
    if (!mapCurrent || !center || !zoom) return;
    mapCurrent.flyTo({ center, zoom });
  }, [center, zoom]);

  useEffect(() => {
    const mapCurrent = mapRef.current;
    if (!mapCurrent) return;
    mapCurrent.setStyle(styleUrl);
  }, [styleUrl]);

  return {
    mapRef,
    map: <div ref={containerRef} style={{ width: "100%", height: "100%" }} />,
  };
};

export default useMapBox;
