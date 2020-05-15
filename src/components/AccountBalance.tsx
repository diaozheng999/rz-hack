// @barrel component type

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colours } from "../styles";

export interface AccountBalanceProps {
  accountNumber: string;
  accountBalance: number;
}

export function AccountBalance({
  accountNumber,
  accountBalance,
}: AccountBalanceProps) {
  return (
    <View style={styles.container}>
      <View style={styles.accountSection}>
        <Text style={styles.accountLabel}>Account</Text>
        <Text style={styles.accountNumber}>{accountNumber}</Text>
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.dollarSign}>$</Text>
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
    height: 80,
    backgroundColor: Colours.background,
    flexDirection: "row",
    padding: 20,
  },
  accountSection: {
    flex: 1,
    justifyContent: "center",
  },
  accountLabel: {
    color: Colours.highlight,
  },
  accountNumber: {
    color: Colours.highlight,
    fontWeight: "bold",
    fontSize: 16,
  },
  balanceSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dollarSign: {
    fontSize: 18,
    color: Colours.primary,
  },
  balance: {
    fontSize: 18,
    color: Colours.primary,
    fontWeight: "bold",
  },
});
