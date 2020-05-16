// @barrel component type

import React from "react";
import { View, StyleSheet } from "react-native";
import { Optional } from "nasi-lemak";

import type { Account } from "../models";
import { AccountBalance, CreateTransaction } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { ThunkDispatch } from "../thunks";
import { TransactionAction } from "../actions";

export interface AccountCardProps {
  account: Account;
  isSelectingDestination: boolean;
}

export function AccountCard({
  account,
  isSelectingDestination,
}: AccountCardProps) {
  const dispatch = useDispatch<ThunkDispatch>();

  const state = useSelector((state: RootState) =>
    state.activeTransactions.has(account.id) ? "TRANSACT" : "BALANCE",
  );

  const outstanding = useSelector((state: RootState) =>
    state.transactions.withdraw.get(account.id),
  );

  const isSelected = useSelector(
    (state: RootState) => state.transactions.destination === account.id,
  );

  return (
    <View style={styles.container}>
      <Optional predicate={state === "BALANCE"}>
        <AccountBalance
          accountNumber={account.maskedNumber}
          accountBalance={account.balance}
          outstandingBalance={outstanding}
          isDestination={isSelected}
          onPress={() =>
            isSelectingDestination
              ? dispatch(TransactionAction.commitDest(account.id))
              : dispatch(TransactionAction.begin(account.id))
          }
        />
      </Optional>
      <Optional predicate={state === "TRANSACT"}>
        <CreateTransaction
          account={account}
          outstandingBalance={outstanding}
          onCancel={() => dispatch(TransactionAction.cancelRow(account.id))}
          onSubmit={(value) =>
            dispatch(TransactionAction.addRow([account.id, value]))
          }
        />
      </Optional>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    borderRadius: 5,
    margin: 20,
    marginTop: 0,
    height: 80,
  },
});
