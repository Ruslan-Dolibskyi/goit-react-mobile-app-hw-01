import React from "react";
import { TouchableOpacity } from "react-native";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

const BackButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowLeftIcon />
    </TouchableOpacity>
  );
};

export default BackButton;
