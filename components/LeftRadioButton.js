import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import enabledRadiobutton from "../assets/images/gagan_radibutton.png";
import gagan_inactive_radiobutton from "../assets/images/gagan_inactive_radiobutton.png";

const LeftRadioButton = (props) => {
  // console.log("rendering Left RadioButton ...");
  if (props.buttonTitle === "Stop" && props.isLeftButtonTurn) {
    return (
      <Image
        style={styles.radioButtonStyle}
        source={enabledRadiobutton}
      ></Image>
    );
  } else {
    return (
      <Image
        style={styles.radioButtonStyle}
        source={gagan_inactive_radiobutton}
      ></Image>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  radioButtonStyle: {
    width: 40,
    height: 40,
  },
});

export default LeftRadioButton;
