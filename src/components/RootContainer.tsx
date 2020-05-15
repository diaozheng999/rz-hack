// @barrel component type

import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

export interface RootContainerProps {
  children: React.ReactNode;
}

export function RootContainer({ children }: RootContainerProps) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {children}
      </SafeAreaView>
    </>
  );
}
