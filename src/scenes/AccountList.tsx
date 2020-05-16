import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { AccountCard } from "./AccountCard";
import { ScrollView } from "react-native-gesture-handler";

export function AccountList() {
  const accounts = useSelector((state: RootState) => state.account);

  return (
    <ScrollView>
      {accounts
        .map((acct, id) => <AccountCard account={acct} key={id} />)
        .toList()
        .toArray()}
    </ScrollView>
  );
}
