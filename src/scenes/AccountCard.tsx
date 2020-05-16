// @barrel component type

import React from "react";
import { View, StyleSheet } from "react-native";
import { Optional } from "nasi-lemak";

import type { Account } from "../models";
import { AccountBalance } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { ThunkDispatch } from "../thunks";
import { TransactionAction } from "../actions";
import { CreateTransaction } from "../components/CreateTransaction";

export interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const dispatch = useDispatch<ThunkDispatch>();

  const state = useSelector((state: RootState) =>
    state.activeTransactions.has(account.id) ? "TRANSACT" : "BALANCE",
  );

  return (
    <View style={styles.container}>
      <Optional predicate={state === "BALANCE"}>
        <AccountBalance
          accountNumber={account.maskedNumber}
          accountBalance={account.balance}
          onPress={() => dispatch(TransactionAction.begin(account.id))}
        />
      </Optional>
      <Optional predicate={state === "TRANSACT"}>
        <CreateTransaction
          account={account}
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
