import { Map } from "immutable";
import type { Account } from "../models";
// @barrel export RootAction, RootState

import { combineReducers, ActionFromReducer } from "redux";
import { AccountReducer } from "./AccountReducer";
import { LoadingReducer } from "./LoadingReducer";

export const RootReducer = combineReducers({
  account: AccountReducer,
  loading: LoadingReducer,
});

export type RootAction = ActionFromReducer<typeof RootReducer>;
export type RootState = ReturnType<typeof RootReducer>;
