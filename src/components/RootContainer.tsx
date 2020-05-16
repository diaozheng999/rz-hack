// @barrel component type

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Colours } from "../styles";

export interface RootContainerProps {
  children: React.ReactNode;
}

export function RootContainer({ children }: RootContainerProps) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.alt,
    flex: 1,
  },
});
