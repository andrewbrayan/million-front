import type { LngLatLike } from "mapbox-gl";

export const getUserLocation = (
  options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 8000,
    maximumAge: 0,
  }
): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      return reject(new Error("Geolocalización no soportada"));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (err) => {
        const msg =
          err.code === err.PERMISSION_DENIED
            ? "Permiso denegado"
            : err.code === err.POSITION_UNAVAILABLE
            ? "Ubicación no disponible"
            : err.code === err.TIMEOUT
            ? "La solicitud de ubicación expiró"
            : "Error de geolocalización";
        reject(new Error(msg));
      },
      options
    );
  });
};
