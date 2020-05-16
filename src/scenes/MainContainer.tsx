import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { MainAccountBalance, ActiveTransactionList } from "../components";

export function MainContainer() {
  const total = useSelector((state: RootState) =>
    state.account.reduce((acc, curr) => acc + curr.balance, 0),
  );

  const transactionAccountCount = useSelector(
    (state: RootState) => state.transactions.withdraw.size,
  );

  const withdrawAmount = useSelector((state: RootState) => state.transactions.withdraw.reduce((acc, amount) => acc + amount, 0));

  if (transactionAccountCount > 0) {
    return (
      <ActiveTransactionList
        accountBalance={total}
        accountCount={transactionAccountCount}
        withdrawalAmount={withdrawAmount}
      />
    );
  }

  return <MainAccountBalance accountBalance={total} />;
}
