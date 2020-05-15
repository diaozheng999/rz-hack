import "react-native-gesture-handler";

import React from "react";
import {
  RootContainer,
  Title,
  MainAccountBalance,
  AccountBalance,
} from "../components";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RootReducer } from "../reducers";
import { Loading } from "./Loading";

const store = configureStore({
  reducer: RootReducer,
});

export function Main() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootContainer>
          <Title title="Q*bert" />
          <MainAccountBalance
            accountBalance={1234.56}
            accountNumber="****2521"
          />
          <ScrollView>
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
            <AccountBalance accountBalance={123.56} accountNumber="****2521" />
          </ScrollView>
          <Loading />
        </RootContainer>
      </NavigationContainer>
    </Provider>
  );
}
