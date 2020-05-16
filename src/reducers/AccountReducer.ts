import type { Account } from "../models";
import { Map } from "immutable";
import { AccountAction, TransactionAction } from "../actions";
import { createWithDefault } from "./utils";
import { assert, Option } from "nasi";

export type AccountState = Map<string, Account>;

function account(
  state: AccountState,
  action: AccountAction | TransactionAction,
): AccountState {
  switch (action.type) {
    case "@@account/ADD_ACCOUNTS":
      let newStateA = state;

      for (const account of action.payload) {
        newStateA = newStateA.set(account.id, account);
      }

      return newStateA;

    case "@@tranct/DELTA":
      let newStateD = state;
      for (const [accountId, delta] of action.payload) {
        const account = newStateD.get(accountId);
        assert(Option.isSome, account);
        newStateD = newStateD.set(account.id, {
          ...account,
          balance: delta + account.balance,
        });
      }
      return newStateD;

    default:
      return state;
  }
}

export const AccountReducer = createWithDefault(account, Map());
