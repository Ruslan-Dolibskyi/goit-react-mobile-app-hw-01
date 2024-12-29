import React from "react";
import { TouchableOpacity } from "react-native";

import ArrowUpButton from "../icons/ArrowUpIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "../styles/global";

const SendButton = ({ onPress = () => {} }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 100,
        backgroundColor: colors.orange,
        width: 34,
        height: 34,
      }}
    >
      <ArrowUpButton />
    </TouchableOpacity>
  );
};

export default SendButton;
