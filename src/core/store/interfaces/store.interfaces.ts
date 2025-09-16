import type { Environments } from "@core/config/env";

// Actions types
import type { ThemeAction, ThemeModeEnum } from "../actions/theme.actions";
import type { PosAction } from "../actions/geo-location-coordinates.actions";
import type { EnvironmentsAction } from "../actions/environments.action";
import type { Coord } from "@shared/services/geocoding.service";
import type { SearchParams, SearchParamsAction } from "../actions/search-params.actions";

export type ReducerFunction = (state: Store, payload?: any) => Store;
export type StoreActionNames = StoreActions["type"];
export type ActionsMap = Record<StoreActionNames, ReducerFunction | undefined>;
export type ZustandStore = Store & { dispatch: (action: StoreActions) => void };

// Set actions types
export type StoreActions = EnvironmentsAction | ThemeAction | PosAction | SearchParamsAction;

export interface Store {
  environments?: Environments;
  theme: ThemeModeEnum;
  pos: Coord | null;
  searchParams: SearchParams | null;
}
