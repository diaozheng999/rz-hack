import { TransactionAction } from "../actions";
import { Thunk } from "./types";
import { Semaphore, assert } from "nasi";
import { destinationIsSet } from "../reducers";

export function CommitTransaction(): Thunk {
  return async (dispatch, getState) => {
    const { transactions } = getState();

    assert(destinationIsSet, transactions.destination);

    dispatch(TransactionAction.commit());

    await Semaphore.sleep(2000);

    const deltas: Array<readonly [string, number]> = [];

    let sum = 0;

    for (const [account, withdraw] of transactions.withdraw) {
      deltas.push([account, -withdraw]);
      sum += withdraw;
    }
    deltas.push([transactions.destination, sum]);

    dispatch(TransactionAction.delta(deltas));

    dispatch(TransactionAction.complete());
  };
}
