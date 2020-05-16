import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { AccountCard } from "./AccountCard";
import { ScrollView } from "react-native-gesture-handler";

export function AccountList() {
  const accounts = useSelector((state: RootState) =>
    state.account
      .toArray()
      .sort((a, b) => a[1].__qfSortOrder - b[1].__qfSortOrder),
  );
  const isSelectingDestination = useSelector(
    (state: RootState) => !!state.transactions.destination,
  );

  return (
    <ScrollView>
      {accounts.map(([id, acct]) => (
        <AccountCard
          account={acct}
          key={id}
          isSelectingDestination={isSelectingDestination}
        />
      ))}
    </ScrollView>
  );
}
