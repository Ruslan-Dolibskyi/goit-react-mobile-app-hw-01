import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const Link = ({ children, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Link;
