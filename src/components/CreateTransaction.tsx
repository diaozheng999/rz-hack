// @barrel component type
import { View, Text } from "react-native";

import React, { useState, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Option, Optional } from "nasi-lemak";
import numeral from "numeral";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import { TextInput, BorderlessButton } from "react-native-gesture-handler";
import { Colours } from "../styles";

import type { Account } from "../models";
import { val } from "../utils";

export interface CreateTransactionProps {
  account: Account;
  outstandingBalance?: number;
  onCancel: () => void;
  onSubmit: (value: number) => void;
}

export function CreateTransaction({
  account,
  outstandingBalance,
  onCancel,
  onSubmit,
}: CreateTransactionProps) {
  const [toDeduct, setToDeduct] = useState("0");

  const [hasError, setError] = useState(false);

  const outstanding = Option.value(outstandingBalance, 0);
  const available = account.balance - outstanding;

  const validate = useMemo(
    () => () => {
      const cents = Math.floor(numeral(toDeduct).value() * 100);

      const ccents = cents * 100;

      const newBalance = outstanding + ccents;

      if (newBalance > account.balance || newBalance < 0) {
        setError(true);
      } else {
        onSubmit(ccents);
      }
    },
    [toDeduct, available],
  );

  return (
    <View style={styles.container}>
      <View style={styles.horizontalWrapper}>
        <View style={styles.label}>
          <Text style={styles.labelStatic}>Withdraw </Text>
          <Text style={styles.labelAcctNo}>${val(account.balance)}</Text>
          <Optional predicate={Option.isSome(outstandingBalance)}>
            <Text style={styles.labelStatic}> (${val(available)})</Text>
          </Optional>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, hasError && styles.inputError]}
            autoFocus
            selectTextOnFocus
            keyboardType="number-pad"
            onChangeText={setToDeduct}
            onEndEditing={validate}
          />
        </View>
      </View>
      <BorderlessButton style={styles.buttonGo} onPress={validate}>
        <FontAwesomeIcon icon={faCheck} color={Colours.background} />
      </BorderlessButton>
      <BorderlessButton style={styles.buttonCancel} onPress={onCancel}>
        <FontAwesomeIcon icon={faTimes} color={Colours.alt} />
      </BorderlessButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colours.highlight,
    borderRadius: 5,
  },
  horizontalWrapper: {
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    flexDirection: "row",
  },
  labelStatic: {
    color: Colours.background,
    flex: 1,
  },
  labelAcctNo: {
    color: Colours.background,
    fontWeight: "bold",
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: Colours.background,
    textAlign: "right",
  },
  inputError: {
    borderWidth: 2,
    borderColor: "red",
  },
  buttonCancel: {
    backgroundColor: Colours.background,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGo: {
    backgroundColor: Colours.primary,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
