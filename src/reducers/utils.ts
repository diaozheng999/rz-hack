// @barrel ignore

import { Reducer as ReactReducer } from "react";
import { Reducer as ReduxReducer, Action as ReduxAction } from "redux";
import { Option } from "nasi";

/**
 * A simple utility function to bypass the typescript error where you cannot
 * append default value to the first param.
 * @param reducer The reducer (assuming that initialState is always set)
 * @param initialState The initial state
 */
export function createWithDefault<State, Action extends ReduxAction<any>>(
  reducer: ReactReducer<State, Action>,
  initialState: State,
): ReduxReducer<State, Action> {
  return (state: Option.Type<State>, action: Action) => {
    const realisedState = state ?? initialState;
    return reducer(realisedState, action) ?? realisedState;
  };
}
