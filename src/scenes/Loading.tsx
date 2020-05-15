import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { Loader } from "../components";

export function Loading() {
  const isLoading = useSelector((state: RootState) => state.loading > 0);

  return <Loader shown={isLoading} />;
}
