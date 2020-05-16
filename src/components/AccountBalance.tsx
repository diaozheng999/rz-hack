// @barrel component type

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import { Colours } from "../styles";
import { val } from "../utils";
import { Option, Optional } from "nasi-lemak";

export interface AccountBalanceProps {
  accountNumber: string;
  accountBalance: number;
  outstandingBalance?: number;
  onPress: () => void;
}

export function AccountBalance({
  accountNumber,
  accountBalance,
  outstandingBalance,
  onPress,
}: AccountBalanceProps) {
  const bal = accountBalance - Option.value(outstandingBalance, 0);

  return (
    <BaseButton style={styles.swipeWrapper} onPress={onPress}>
      <View style={styles.accountSection}>
        <Text style={styles.accountLabel}>Account</Text>
        <Text style={styles.accountNumber}>{accountNumber}</Text>
      </View>
      <View style={styles.balanceSection}>
        <View style={styles.section}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.balance}>{val(accountBalance)}</Text>
        </View>
        <Optional predicate={Option.isSome(outstandingBalance)}>
          <View style={styles.section}>
            <Text style={styles.available}>(${val(bal)})</Text>
          </View>
        </Optional>
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
    alignItems: "flex-end",
  },
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dollarSign: {
    fontSize: 18,
    color: Colours.primary,
  },
  available: {
    fontSize: 14,
    color: Colours.primary,
  },
  balance: {
    fontSize: 18,
    color: Colours.primary,
    fontWeight: "bold",
  },
});
