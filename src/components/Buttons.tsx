// @barrel component type

import React, { useRef, useEffect } from "react";
import { Animated, Text, View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Colours } from "../styles";

export interface ButtonsProps {
  shouldShow: boolean;
  onCommit: () => void;
  onCancel: () => void;
  commitIcon: IconDefinition;
  commitLabel: string;
  commitEnabled: boolean;
}

export function Buttons({
  shouldShow,
  onCommit,
  onCancel,
  commitIcon,
  commitLabel,
  commitEnabled,
}: ButtonsProps) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: +shouldShow,
      useNativeDriver: true,
    }).start();
  }, [shouldShow]);

  const transform = {
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const commitButtonStyle: StyleProp<ViewStyle> =
    commitEnabled ? styles.commitButton : [styles.commitButton, styles.disabled];

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, transform]}>
        <RectButton onPress={onCancel} style={styles.cancelButton}>
          <FontAwesomeIcon
            icon={faTimes}
            size={18}
            color={Colours.background}
          />
        </RectButton>
        <RectButton onPress={onCommit} style={commitButtonStyle} enabled={commitEnabled}>
          <FontAwesomeIcon
            icon={commitIcon}
            size={18}
            color={Colours.background}
          />
          <Text style={styles.commitLabel}>{commitLabel}</Text>
        </RectButton>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: Colours.primary,
    flexDirection: "row",
  },
  cancelButton: {
    width: 80,
    backgroundColor: Colours.highlight,
    alignItems: "center",
    justifyContent: "center",
  },
  commitButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  commitLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: Colours.background,
  },
  wrapper: {
    overflow: "visible",
    zIndex: 1,
    height: 0,
  },
  disabled: {
    backgroundColor: Colours.secondary,
  }
});
