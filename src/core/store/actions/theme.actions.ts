import { useStore } from "../store";
import type { Store } from "../interfaces/store.interfaces";

export enum ThemeModeEnum {
  DARK = "dark",
  LIGHT = "light",
  SYSTEM = "system",
}

export enum ThemeActionEnum {
  SET_THEME = "SET_THEME",
  TOGGLE_THEME = "TOGGLE_THEME",
}

export type ThemeAction =
  | { type: ThemeActionEnum.SET_THEME; payload: ThemeModeEnum }
  | { type: ThemeActionEnum.TOGGLE_THEME };

export const themeActions = {
  [ThemeActionEnum.SET_THEME]: (
    state: Store,
    payload: ThemeModeEnum
  ): Store => ({
    ...state,
    theme: payload,
  }),
  [ThemeActionEnum.TOGGLE_THEME]: (state: Store): Store => {
    const newTheme =
      (state.theme as ThemeModeEnum) === ThemeModeEnum.DARK
        ? ThemeModeEnum.DARK
        : ThemeModeEnum.LIGHT;
    return themeActions.SET_THEME(state, newTheme);
  },
};

export const setTheme = (theme: ThemeModeEnum): void => {
  useStore
    .getState()
    .dispatch({ type: ThemeActionEnum.SET_THEME, payload: theme });
};

export const toggleTheme = (): void => {
  useStore.getState().dispatch({ type: ThemeActionEnum.TOGGLE_THEME });
};
