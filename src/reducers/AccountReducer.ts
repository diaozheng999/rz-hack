import type { Account } from "../models";
import { Map } from "immutable";
import { AccountAction } from "../actions";
import { createWithDefault } from "./utils";

export type AccountState = Map<string, Account>;

function account(state: AccountState, action: AccountAction): AccountState {
  switch (action.type) {
    case "@@account/ADD_ACCOUNTS":
      let newState = state;

      for (const account of action.payload) {
        newState = newState.set(account.id, account);
      }

      return newState;

    default:
      return state;
  }
}

export const AccountReducer = createWithDefault(account, Map());
