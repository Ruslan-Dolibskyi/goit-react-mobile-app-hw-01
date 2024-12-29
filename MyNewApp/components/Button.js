import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../styles/global";

const Button = ({ children, onPress, buttonStyle, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.light_gray : colors.orange },
        buttonStyle,
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: colors.orange,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});

export default Button;
