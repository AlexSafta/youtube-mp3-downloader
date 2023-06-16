import React from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle, StyleProp } from "react-native";
import Theme from "../assets/theme/theme.styles";
import { textStyles } from "../assets/theme/shared.styles";

interface ButtonProps {
  title: string;
  loadingTitle?: string;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress(): void;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  title,
  loadingTitle,
  color = Theme.purple,
  textColor = Theme.white,
  disabled = false,
  loading = false,
  onPress,
  style,
}: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        style,
        styles.root,
        {
          opacity: pressed? 0.75 : 1,
          backgroundColor: color
        }
      ]}
    >
      {loading && (
        <ActivityIndicator size={'small'} color={textColor} style={styles.loader} />
      )}
      <Text style={[styles.title, { color: textColor }]}>
        {loading ? loadingTitle || title : title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    ...textStyles.buttonTitle,
  },
  loader: {
    marginRight: 4,
  },
})

export default Button;