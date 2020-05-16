import { AccountAction } from "../actions";
import { createWithDefault } from "./utils";

export type LoadingState = number;

function loading(state: LoadingState, action: AccountAction): LoadingState {
  switch (action.type) {
    case "@@account/BEGIN_FETCH_ALL":
      return ++state;

    case "@@account/COMPLETE_FETCH_ALL":
      return Math.max(0, --state);

    default:
      return state;
  }
}

export const LoadingReducer = createWithDefault(loading, 0);
