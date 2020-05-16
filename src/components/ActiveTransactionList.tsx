// @barrel component type

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { val } from "../utils";
import { Colours } from "../styles";

export interface ActiveTransactionListProps {
  accountBalance: number;
  accountCount: number;
  withdrawalAmount: number;
}

export function ActiveTransactionList({
  accountBalance,
  accountCount,
  withdrawalAmount,
}: ActiveTransactionListProps) {
  const pl = accountCount === 1 ? "" : "s";

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountNumber}>
          Withdrawing from {accountCount} account{pl}
        </Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceDollar}>$</Text>
        <Text style={styles.balance}>{val(withdrawalAmount)}</Text>
      </View>
      <View>
        <Text style={styles.available}>${val(accountBalance)} available</Text>
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
    height: 140,
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
  available: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colours.highlight,
  },
});
