import type { Store } from "../interfaces/store.interfaces";
import type { StateStorage } from "zustand/middleware";
import { getSystemTheme } from "@shared/utils/get-system-theme";

export const INITIAL_STORE_STATE: Store = {
  environments: {
    api: "",
    mapboxAccessToken: "",
  },
  theme: getSystemTheme(),
  pos: null,
  searchParams: {
    page: 1,
    pageSize: 21,
  },
};

// No-op storage para cuando todo falla
export const NO_OP_STORAGE: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const STORE_KEY_NAME = "inventory-store";
