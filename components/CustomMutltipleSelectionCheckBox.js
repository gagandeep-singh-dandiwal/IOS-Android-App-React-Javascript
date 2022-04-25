import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Checkbox, Divider } from "react-native-paper";

import colors from "../assets/colors/colors";
import { useSelector } from "react-redux";
import CustomText from "./CustomText";
import colorsForTheApp from "./ColorCalculator";

let windowWidthLocal;

const CustomMutltipleSelectionCheckBox = (props) => {
  windowWidthLocal = useSelector(
    (state) => state.deviceInformation.windowWidth
  );
  const [isChordChecked, SetIsChordChecked] = useState(() => {
    if (props.isChecked) {
      return "checked";
    } else return "unchecked";
  });
  //   const [isNoteChecked, SetIsNoteChecked] = useState("unchecked");

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (isChordChecked === "unchecked") {
              SetIsChordChecked("checked");
              props.onPress(props.index);
            } else if (isChordChecked === "checked") {
              SetIsChordChecked("unchecked");
              props.onPress(props.index);
            }
          }}
          style={{ width: windowWidthLocal }}
        >
          <View
            style={{
              width: windowWidthLocal,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <View style={{ flex: 0.85 }}>
              <CustomText style={{ fontSize: 20 }}>{props.title}</CustomText>
            </View>
            <View style={{ flex: 0.15 }}>
              <Checkbox
                status={isChordChecked}
                color={colorsForTheApp.primaryColor}
              ></Checkbox>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: windowWidthLocal }}>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "grey", opacity: 0.4 }}
          />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CustomMutltipleSelectionCheckBox;
