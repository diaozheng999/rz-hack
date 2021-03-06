import { createAction } from "@reduxjs/toolkit";
import { createTypedAction, AllActionsOf } from "./utils";

export const TransactionAction = {
  begin: createTypedAction<string>()("@@tranct/BEGIN"),
  beginSetDest: createAction("@@tranct/BEGIN_SET_DEST"),
  commitDest: createTypedAction<string>()("@@tranct/COMMIT_DEST"),
  cancelRow: createTypedAction<string>()("@@tranct/CANCEL_ROW"),
  addRow: createTypedAction<readonly [string, number]>()("@@tranct/ADD_ROW"),
  commit: createAction("@@tranct/BEGIN_COMMIT"),
  complete: createAction("@@tranct/COMPLETE"),
  cancel: createAction("@@tranct/CANCEL"),
  delta: createTypedAction<Array<readonly [string, number]>>()(
    "@@tranct/DELTA",
  ),
};

export type TransactionAction = AllActionsOf<typeof TransactionAction>;
