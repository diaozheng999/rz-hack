// @barrel component type

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colours } from "../styles";

export interface MainAccountBalanceProps {
  accountNumber: string;
  accountBalance: number;
}

export function MainAccountBalance({
  accountNumber,
  accountBalance,
}: MainAccountBalanceProps) {
  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountLabel}>Account</Text>
        <Text style={styles.accountNumber}>{accountNumber}</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceDollar}>$</Text>
        <Text style={styles.balance}>{accountBalance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    borderRadius: 5,
    margin: 20,
    marginTop: 0,
    height: 180,
    padding: 20,
    backgroundColor: Colours.background,
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountLabel: {
    marginRight: 10,
    color: Colours.highlight,
  },
  accountNumber: {
    color: Colours.highlight,
    fontWeight: "bold",
    fontSize: 18,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  balanceDollar: {
    fontWeight: "bold",
    color: Colours.primary,
  },
  balance: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colours.primary,
  },
});
