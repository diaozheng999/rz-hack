import { AccountAction } from "../actions";
import { Thunk } from "./types";
import { Account } from "../models";

interface QBAccount {
  accounts: Array<{
    id: string;
    name: string;
    balance: string;
  }>;
}

export async function getAccounts(): Promise<Account[]> {
  try {
    const response = await fetch("http://54.169.75.49:12012/accounts");
    const result: QBAccount = await response.json();
    return result.accounts.map(({ id, name, balance }, __qfSortOrder) => ({
      id,
      maskedNumber: name,
      type: name,
      balance: parseInt(balance, 10),
      __qfSortOrder,
    }));
  } catch (e) {
    console.warn("An error occurred.");
    return [];
  }
}

export function GetAccounts(): Thunk {
  return async (dispatch) => {
    dispatch(AccountAction.beginFetchAll());

    try {
      const accounts = await getAccounts();

      dispatch(AccountAction.setAllAccounts(accounts));
    } catch (e) {
      console.warn("An error occurred.");
    }

    dispatch(AccountAction.completeFetchAll());
  };
}
