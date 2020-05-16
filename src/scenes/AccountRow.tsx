import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { AccountBalance } from "../components";

export function AccountRow() {
  const accounts = useSelector((state: RootState) => state.account);

  return (
    <>
      {accounts
        .map((acct, id) => (
          <AccountBalance
            accountNumber={acct.maskedNumber}
            accountBalance={acct.balance}
            key={id}
          />
        ))
        .toList()
        .toArray()}
    </>
  );
}
