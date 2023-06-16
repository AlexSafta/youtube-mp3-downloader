import React, { ReactElement, ReactNode } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Theme from "../assets/theme/theme.styles";

interface ScreenProps {
  children: ReactNode;
}

const Screen = ({children}: ScreenProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.root, !!top && top > 0 ? { paddingTop: top }: styles.staticTopPadding]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    backgroundColor: Theme.white,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  staticTopPadding: {
    paddingTop: 40,
  }
});

export default Screen