export const checkGeoPermission = async (): Promise<PermissionState | null> => {
  if (!("permissions" in navigator)) return null;
  try {
    const status = await (navigator as any).permissions.query({
      name: "geolocation",
    });
    return status.state as PermissionState;
  } catch {
    return null;
  }
};
