// @barrel export Thunk, ThunkDispatch

// @barrel export ThunkDispatch

import { ThunkDispatch as RDThunkDispatch } from 'redux-thunk';
import type { RootState, RootAction } from '../reducers';

export type ThunkDispatch = RDThunkDispatch<RootState, undefined, RootAction>;