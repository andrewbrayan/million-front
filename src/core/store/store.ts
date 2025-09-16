// External libraries
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Store constants
import {
  INITIAL_STORE_STATE,
  NO_OP_STORAGE,
  STORE_KEY_NAME,
} from "./constants/store.constants";

// Store types/interfaces
import type {
  ActionsMap,
  Store,
  StoreActions,
  ZustandStore,
} from "./interfaces/store.interfaces";

// Actions
import { environmentsActions } from "./actions/environments.action";
import { themeActions } from "./actions/theme.actions";
import { posActions } from "./actions/geo-location-coordinates.actions";
import { searchParamsActions } from "./actions/search-params.actions";

// --- helpers ---
const hasPayload = (
  action: StoreActions
): action is StoreActions & { payload: unknown } => "payload" in action;

// Storage picker con test de escritura
function pickAvailableStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  const tryUse = (s: Storage | null) => {
    if (!s) return false;
    try {
      const k = "__z_test__";
      s.setItem(k, "1");
      s.removeItem(k);
      return true;
    } catch {
      return false;
    }
  };
  if (tryUse(window.sessionStorage)) return window.sessionStorage;
  return null;
}

const storeReducer = (state: Store, action: StoreActions): Store => {
  const type = action.type;
  const payload = hasPayload(action) ? action.payload : undefined;
  const actions: ActionsMap = {
    ...environmentsActions,
    ...themeActions,
    ...posActions,
    ...searchParamsActions,
  };
  const reducerFunction = actions[type];
  return reducerFunction ? reducerFunction(state, payload) : state;
};

export const useStore = create(
  persist<ZustandStore>(
    (set) => ({
      ...INITIAL_STORE_STATE,
      dispatch: (action) => set((state) => storeReducer(state, action)),
      reset: () => set(INITIAL_STORE_STATE, false),
    }),
    {
      name: STORE_KEY_NAME,
      storage: createJSONStorage(() => pickAvailableStorage() ?? NO_OP_STORAGE),
    }
  )
);
