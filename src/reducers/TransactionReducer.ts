// @barrel export DESTINATION_UNSET_SYMBOL, destinationIsSet

import { Map } from "immutable";
import { Option } from "nasi";
import { TransactionAction } from "../actions";
import { createWithDefault } from "./utils";

export const DESTINATION_UNSET_SYMBOL = Symbol("QBDestination");

export interface TransactionState {
  withdraw: Map<string, number>;
  destination?: string | typeof DESTINATION_UNSET_SYMBOL;
}

export function destinationIsSet(
  d: Option.Type<string | typeof DESTINATION_UNSET_SYMBOL>,
): d is string {
  return Option.isSome(d) && d !== DESTINATION_UNSET_SYMBOL;
}

function transaction(
  state: TransactionState,
  action: TransactionAction,
): TransactionState {
  switch (action.type) {
    case "@@tranct/BEGIN":
      return {
        withdraw: Option.value(state.withdraw, Map()),
      };

    case "@@tranct/ADD_ROW":
      const [id, value] = action.payload;

      if (!value) {
        return state;
      }

      const prevWithdraw = Option.value(state.withdraw, Map<string, number>());
      const prevValue = prevWithdraw.get(id);

      const newValue = Option.value(prevValue, 0) + value;

      return {
        withdraw: newValue
          ? prevWithdraw.set(id, newValue)
          : prevWithdraw.remove(id),
        destination: state.destination,
      };

    case "@@tranct/BEGIN_SET_DEST":
      return {
        withdraw: state.withdraw,
        destination: DESTINATION_UNSET_SYMBOL,
      };

    case "@@tranct/COMMIT_DEST":
      return {
        withdraw: state.withdraw,
        destination: action.payload,
      };

    case "@@tranct/BEGIN_COMMIT":
    case "@@tranct/CANCEL":
      return {
        withdraw: Map(),
      };

    default:
      return state;
  }
}

export const TransactionReducer = createWithDefault(transaction, {
  withdraw: Map<string, number>(),
});
