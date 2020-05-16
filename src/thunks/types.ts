// @barrel export Thunk, ThunkDispatch

import { ThunkDispatch as RDThunkDispatch, ThunkAction } from "redux-thunk";
import type { RootState, RootAction } from "../reducers";

export type ThunkDispatch = RDThunkDispatch<RootState, undefined, RootAction>;

export type Thunk = ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  RootAction
>;

export const types = undefined;
