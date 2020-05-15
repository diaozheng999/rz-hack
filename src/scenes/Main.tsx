import React from "react";
import { RootContainer, Title, MainAccountBalance } from "../components";

export function Main() {
  return (
    <RootContainer>
      <Title title="Q*bert" />
      <MainAccountBalance accountBalance={1234.56} accountNumber="****2521" />
    </RootContainer>
  );
}
