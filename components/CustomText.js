import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import colors from "../assets/colors/colors";
import colorsForTheApp from "./ColorCalculator";

const CustomText = (props) => {
//   console.log(props);
  return (
    <Text
      style={{
        ...props.style,
        color: colorsForTheApp.textColor,
      }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CustomText;
