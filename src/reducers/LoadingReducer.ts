import { AccountAction, TransactionAction } from "../actions";
import { createWithDefault } from "./utils";

export type LoadingState = number;

function loading(
  state: LoadingState,
  action: AccountAction | TransactionAction,
): LoadingState {
  switch (action.type) {
    case "@@account/BEGIN_FETCH_ALL":
    case "@@tranct/BEGIN_COMMIT":
      return ++state;

    case "@@account/COMPLETE_FETCH_ALL":
    case "@@tranct/COMPLETE":
      return Math.max(0, --state);

    default:
      return state;
  }
}

export const LoadingReducer = createWithDefault(loading, 0);
