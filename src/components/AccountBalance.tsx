// @barrel component type

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import { Colours } from "../styles";
import { val } from "../utils";

export interface AccountBalanceProps {
  accountNumber: string;
  accountBalance: number;
  onPress: () => void;
}

export function AccountBalance({
  accountNumber,
  accountBalance,
  onPress,
}: AccountBalanceProps) {
  return (
    <BaseButton style={styles.swipeWrapper} onPress={onPress}>
      <View style={styles.accountSection}>
        <Text style={styles.accountLabel}>Account</Text>
        <Text style={styles.accountNumber}>{accountNumber}</Text>
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.dollarSign}>$</Text>
        <Text style={styles.balance}>{val(accountBalance)}</Text>
      </View>
    </BaseButton>
  );
}

const styles = StyleSheet.create({
  swipeWrapper: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    backgroundColor: Colours.background,
    borderRadius: 5,
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
