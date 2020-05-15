// @barrel component type

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface MainAccountBalanceProps {
  accountNumber: string;
  accountBalance: number;
}

export function MainAccountBalance({ accountNumber, accountBalance }: MainAccountBalanceProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Account</Text>
        <Text>{accountNumber}</Text>
      </View>
      <View>
        <Text>${accountBalance}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    borderRadius: 5,
    margin: 20,
    marginTop: 0,
    height: 240,
    backgroundColor: "#cbf3f0",
  }
});
