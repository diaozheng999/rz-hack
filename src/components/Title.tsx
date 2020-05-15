// @barrel component type

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colours } from "../styles";

export interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: 72,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: Colours.primary,
  },
});
