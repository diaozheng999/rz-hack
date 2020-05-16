import { Map } from "immutable";
import { Option } from "nasi";
import { TransactionAction } from "../actions";
import { createWithDefault } from "./utils";

export interface TransactionState {
  withdraw: Map<string, number>;
  destination?: string;
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
