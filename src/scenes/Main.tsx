import "react-native-gesture-handler";

import React, { useEffect } from "react";
import { RootContainer, Title } from "../components";
import { NavigationContainer } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RootReducer } from "../reducers";
import { Loading } from "./Loading";
import { ThunkDispatch, GetAccounts } from "../thunks";
import thunk from "redux-thunk";
import { MainContainer } from "./MainContainer";
import { AccountList } from "./AccountList";
import { BottomButtons } from "./BottomButtons";

const store = configureStore({
  reducer: RootReducer,
  middleware: [thunk],
});

export function Main() {
  useEffect(() => {
    const dispatch: ThunkDispatch = store.dispatch;
    dispatch(GetAccounts());
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootContainer>
          <Title title="Q*bert" />
          <MainContainer />
          <AccountList />
          <BottomButtons />
          <Loading />
        </RootContainer>
      </NavigationContainer>
    </Provider>
  );
}
