import { Action, AccountAction } from "../actions";
import { Thunk } from "./types";
import { Semaphore } from "nasi";

export function GetAccounts(): Thunk {
  return async (dispatch) => {
    dispatch(AccountAction.beginFetchAll());

    await Semaphore.sleep(1000);

    dispatch(
      AccountAction.setAllAccounts([
        {
          id: "1001",
          maskedNumber: "****1234",
          type: "DBS",
          balance: 12345600,
        },
        {
          id: "1002",
          maskedNumber: "****8325",
          type: "OCBC",
          balance: 346200,
        },
        {
          id: "1003",
          maskedNumber: "****5327",
          type: "UOB",
          balance: 125263700,
        },
      ]),
    );

    dispatch(AccountAction.completeFetchAll());
  };
}
