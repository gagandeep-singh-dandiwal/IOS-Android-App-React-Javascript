import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-paper'
import colors from '../assets/colors/colors'
import colorsForTheApp from "./ColorCalculator";

const ReactButton = props => {
    return (
      <Button mode="contained" color={colorsForTheApp.primaryColor} onPress={props.onPress}>
        {props.title}
      </Button>
    );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default ReactButton;
