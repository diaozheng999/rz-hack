import { List } from "immutable";
import { invariant, Option } from "nasi";
import { TransactionAction } from "../actions";
import { createWithDefault } from "./utils";

type Row = readonly [string, number];

export interface TransactionState {
  withdraw?: List<Row>;
  destination?: string;
}

function transaction(
  state: TransactionState,
  action: TransactionAction,
): TransactionState {
  switch (action.type) {
    case "@@tranct/BEGIN":
      invariant(() => !state);
      return {
        withdraw: List(),
      };

    case "@@tranct/ADD_ROW":
      return {
        withdraw: Option.value(state.withdraw, List()).push(action.payload),
        destination: state.destination,
      };

    case "@@tranct/COMMIT_DEST":
      return {
        withdraw: state.withdraw,
        destination: action.payload,
      };

    case "@@tranct/BEGIN_COMMIT":
    case "@@tranct/CANCEL":
      return {};

    default:
      return state;
  }
}

export const TransactionReducer = createWithDefault(transaction, {});
