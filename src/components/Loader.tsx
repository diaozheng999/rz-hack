// @barrel component type

import React, { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";

import LOADING_ANIMATION from "../resources/loading.json";
import { StyleSheet, Animated } from "react-native";
import { Colour } from "nasi";

export interface LoaderProps {
  shown: boolean;
}

export function Loader({ shown }: LoaderProps) {
  const [lastShown, setLastShown] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (shown !== lastShown) {
      Animated.spring(anim, {
        toValue: +shown,
        useNativeDriver: true,
      }).start(() => {
        setLastShown(shown);
      });
    }
  }, [shown, lastShown]);

  if (!shown && !lastShown) {
    return <></>;
  }

  return (
    <Animated.View style={[styles.overlay, { opacity: anim }]}>
      <LottieView
        source={LOADING_ANIMATION}
        autoPlay
        loop
        style={styles.lottie}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: Colour.toString(Colour.rgba(1, 1, 1, 0.95, true)),
    elevation: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  lottie: {
    alignSelf: "center",
  },
});
