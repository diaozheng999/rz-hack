import { TransactionAction } from "../actions";
import { Thunk } from "./types";
import { assert, Option, Unique, UniqueValue } from "nasi";
import { destinationIsSet } from "../reducers";
import { getAccounts } from "./GetAccounts";

async function transfer(
  fromAccount: string,
  toAccount: string,
  amount: number,
  __qfCorrelationId: UniqueValue,
) {
  if (fromAccount === toAccount) {
    console.log(">>transfer", "<not necessary>");
    return;
  }

  const response = {
    amount: amount.toString(10),
    toAccount,
    fromAccount,
    __qfCorrelationId,
  };

  const responseString = JSON.stringify(response);

  console.log(">>transfer", response);


  await fetch("http://54.169.75.49:12012/transfer", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-length": responseString.length.toString(10),
    },
    body: responseString,
  });

  return;
}

const Transaction = new Unique("QFTransaction");

export function CommitTransaction(): Thunk {
  return async (dispatch, getState) => {
    const { transactions, account } = getState();

    assert(destinationIsSet, transactions.destination);

    const dest = transactions.destination;
    const txid = Transaction.opaque;

    dispatch(TransactionAction.commit());

    await Promise.all(
      transactions.withdraw
        .toArray()
        .map(([from, amount]) => transfer(from, dest, amount, txid)),
    );

    const newAcct = await getAccounts();

    console.log(newAcct);

    const deltas: Array<readonly [string, number]> = [];

    for (const acct of newAcct) {
      const oldAcct = account.get(acct.id);

      if (Option.isSome(oldAcct)) {
        const delta = acct.balance - oldAcct.balance;
        if (delta) {
          deltas.push([acct.id, delta]);
        }
      }
    }

    dispatch(TransactionAction.delta(deltas));

    dispatch(TransactionAction.complete());
  };
}
