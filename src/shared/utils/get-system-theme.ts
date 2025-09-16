import { ThemeModeEnum } from "@core/store/actions/theme.actions";

export const getSystemTheme = (): ThemeModeEnum => {
  if (typeof window === "undefined") return ThemeModeEnum.DARK;
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDarkMode ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
};
