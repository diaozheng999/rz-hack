import { Map } from "immutable";
import { TransactionAction } from "../actions";
import { createWithDefault } from "./utils";

export type ActiveTransactionState = Map<string, unknown>;

function transaction(
  state: ActiveTransactionState,
  action: TransactionAction,
): ActiveTransactionState {
  switch (action.type) {
    case "@@tranct/BEGIN":
      return state.set(action.payload, action.payload);

    case "@@tranct/ADD_ROW":
      return state.remove(action.payload[0]);

    case "@@tranct/CANCEL_ROW":
      return state.remove(action.payload);

    case "@@tranct/BEGIN_SET_DEST":
    case "@@tranct/CANCEL":
      return Map();

    default:
      return state;
  }
}

export const ActiveTransactionReducer = createWithDefault(transaction, Map());
