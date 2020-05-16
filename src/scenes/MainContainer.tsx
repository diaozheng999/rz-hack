import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { MainAccountBalance } from "../components";

export function MainContainer() {
  const total = useSelector((state: RootState) =>
    state.account.reduce((acc, curr) => acc + curr.balance, 0),
  );

  return <MainAccountBalance accountBalance={total} />;
}
