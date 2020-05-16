import React from "react";
import { Buttons } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { faInbox, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ThunkDispatch } from "../thunks";
import { TransactionAction } from "../actions";
import { CommitTransaction } from "../thunks/CommitTransaction";

export function BottomButtons() {
  const shouldShow = useSelector(
    (state: RootState) => state.transactions.withdraw.size > 0,
  );

  const isSelectingDestination = useSelector(
    (state: RootState) => !!state.transactions.destination,
  );

  const dispatch = useDispatch<ThunkDispatch>();

  const commitIcon = isSelectingDestination ? faPaperPlane : faInbox;
  const commitLabel = isSelectingDestination ? "Commit" : "Select Destination";

  return (
    <Buttons
      shouldShow={shouldShow}
      onCancel={() => dispatch(TransactionAction.cancel())}
      onCommit={() => {
        if (isSelectingDestination) {
          dispatch(CommitTransaction());
        } else {
          dispatch(TransactionAction.beginSetDest());
        }
      }}
      commitIcon={commitIcon}
      commitLabel={commitLabel}
    />
  );
}
