import type { Store } from "../interfaces/store.interfaces";
import type { env } from "@core/config/env";
import { useStore } from "../store";
import { INITIAL_STORE_STATE } from "../constants/store.constants";

export type Environments = typeof env;

export enum EnvironmentsActionEnum {
  SET_ENVIRONMENTS = "SET_ENVIRONMENTS",
  SET_ENVIRONMENT = "SET_ENVIRONMENT",
}

export type EnvironmentsAction =
  | { type: EnvironmentsActionEnum.SET_ENVIRONMENTS; payload: Environments }
  | {
      type: EnvironmentsActionEnum.SET_ENVIRONMENT;
      payload: {
        key: keyof Environments;
        value: Environments[keyof Environments];
      };
    };

export const environmentsActions = {
  [EnvironmentsActionEnum.SET_ENVIRONMENTS]: (
    state: Store,
    payload: Environments
  ): Store => {
    return {
      ...state,
      environments: payload,
    };
  },
  [EnvironmentsActionEnum.SET_ENVIRONMENT]: (
    state: Store,
    payload: {
      env: keyof Environments;
      value: Environments[keyof Environments];
    }
  ): Store => ({
    ...state,
    environments: {
      ...(state.environments as Environments),
      [payload.env]: payload.value,
    } as Environments,
  }),
};

export const setEnvironments = (environments: Environments): void => {
  useStore.getState().dispatch({
    type: EnvironmentsActionEnum.SET_ENVIRONMENTS,
    payload: environments,
  });
};

export const getEnvironments = (): Environments => {
  const environments = useStore.getState().environments;
  return environments ?? INITIAL_STORE_STATE.environments!;
};

export const getEnvironment = (
  env: keyof Environments
): Environments[keyof Environments] => {
  const environments = useStore.getState().environments;
  const response = environments?.[env];
  if (!response) {
    throw new Error("Environments not set");
  }
  return response;
};
