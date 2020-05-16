// @barrel component type

import React from "react";
import { View, Text, StyleSheet, StyleProp } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import { Colours } from "../styles";
import { val } from "../utils";
import { Option, Optional, Types } from "nasi-lemak";

export interface AccountBalanceProps {
  accountNumber: string;
  accountBalance: number;
  isDestination: boolean;
  outstandingBalance?: number;
  onPress: () => void;
}

export function AccountBalance({
  accountNumber,
  accountBalance,
  outstandingBalance,
  isDestination,
  onPress,
}: AccountBalanceProps) {
  const bal = accountBalance - Option.value(outstandingBalance, 0);

  const style = <T extends keyof typeof destination>(
    i: T,
  ): StyleProp<typeof styles[T]> => {
    if (isDestination) {
      return [styles[i], destination[i] as Types.Unconstrained];
    }
    return styles[i];
  };

  return (
    <BaseButton style={style("swipeWrapper")} onPress={onPress}>
      <View style={styles.accountSection}>
        <Text style={style("accountLabel")}>Account</Text>
        <Text style={style("accountNumber")}>{accountNumber}</Text>
      </View>
      <View style={styles.balanceSection}>
        <View style={styles.section}>
          <Text style={style("dollarSign")}>$</Text>
          <Text style={style("balance")}>{val(accountBalance)}</Text>
        </View>
        <Optional predicate={Option.isSome(outstandingBalance)}>
          <View style={styles.section}>
            <Text style={style("available")}>(${val(bal)})</Text>
          </View>
        </Optional>
      </View>
    </BaseButton>
  );
}

const destination = StyleSheet.create({
  swipeWrapper: {
    backgroundColor: Colours.primary,
  },
  accountLabel: {
    color: Colours.background,
  },
  accountNumber: {
    color: Colours.background,
  },
  dollarSign: {
    color: Colours.background,
  },
  available: {
    color: Colours.background,
  },
  balance: {
    color: Colours.background,
  },
});

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
