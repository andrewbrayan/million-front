import { useStore } from "../store";
import type { Store } from "../interfaces/store.interfaces";

export interface SearchParams {
  name?: string;
  lat?: number;
  lng?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyOperationType?: number;
  page?: number;
  pageSize?: number;
}

export enum SearchParamsActionEnum {
  SET_SEARCH_PARAMS = "SET_SEARCH_PARAMS",
  CLEAR_SEARCH_PARAMS = "CLEAR_SEARCH_PARAMS",
}

export type SearchParamsAction =
  | { type: SearchParamsActionEnum.SET_SEARCH_PARAMS; payload: SearchParams }
  | { type: SearchParamsActionEnum.CLEAR_SEARCH_PARAMS };

export const searchParamsActions = {
  [SearchParamsActionEnum.SET_SEARCH_PARAMS]: (
    state: Store,
    payload: SearchParams
  ): Store => ({
    ...state,
    searchParams: { ...state.searchParams, ...payload },
  }),
  [SearchParamsActionEnum.CLEAR_SEARCH_PARAMS]: (state: Store): Store => ({
    ...state,
    searchParams: null,
  }),
};

export const setSearchParams = (searchParams: SearchParams): void => {
  useStore.getState().dispatch({
    type: SearchParamsActionEnum.SET_SEARCH_PARAMS,
    payload: searchParams,
  });
};

export const clearSearchParams = (): void => {
  useStore.getState().dispatch({
    type: SearchParamsActionEnum.CLEAR_SEARCH_PARAMS,
  });
};
