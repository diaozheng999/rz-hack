import type { Account } from "../models";

import { AllActionsOf, createTypedAction } from "./utils";
import { createAction } from "@reduxjs/toolkit";

export const AccountAction = {
  beginFetchAll: createAction("@@account/BEGIN_FETCH_ALL"),
  completeFetchAll: createAction("@@account/COMPLETE_FETCH_ALL"),
  setAllAccounts: createTypedAction<Iterable<Account>>()(
    "@@account/ADD_ACCOUNTS",
  ),
};

export type AccountAction = AllActionsOf<typeof AccountAction>;
