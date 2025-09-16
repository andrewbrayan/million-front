import { useStore } from "../store";
import type { Store } from "../interfaces/store.interfaces";
import type { Coord } from "@shared/services/geocoding.service";

export enum PosActionEnum {
  SET_POS = "SET_POS",
  CLEAR_POS = "CLEAR_POS",
}

export type PosAction =
  | { type: PosActionEnum.SET_POS; payload: Coord }
  | { type: PosActionEnum.CLEAR_POS };

export const posActions = {
  [PosActionEnum.SET_POS]: (
    state: Store,
    payload: Coord
  ): Store => ({
    ...state,
    pos: payload,
  }),
  [PosActionEnum.CLEAR_POS]: (state: Store): Store => ({
    ...state,
    pos: null,
  }),
};

export const setPos = (pos: Coord): void => {
  useStore.getState().dispatch({ type: PosActionEnum.SET_POS, payload: pos });
};

export const getPos = (): Coord | null => {
  return useStore.getState().pos;
};

export const clearPos = (): void => {
  useStore.getState().dispatch({ type: PosActionEnum.CLEAR_POS });
};
