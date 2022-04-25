import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Appearance,
  useColorScheme,
} from "react-native";
import colors from "../assets/colors/colors";

var colorScheme = Appearance.getColorScheme();
// Appearance.addChangeListener(AppearanceChangeListener)
// const AppearanceChangeListener = () => {console.log('colorcalculator.js line 7 - colr scheme changed.')}

var colorsForTheApp = {
  primaryColor:
    colorScheme === "light" ? colors.primary : colors.darkMode_primary,
  backgroundColor: colorScheme === "light" ? "#ffffff" : "#000000",
  textColor: colorScheme === "light" ? "#000000" : "#ffffff",
};

const AppearanceChangeListener = (scheme) => {

    console.log('colocalculator line 23 - scheme changed - ' + scheme.colorScheme);

  (colorsForTheApp.primaryColor =
    colorScheme === "light" ? colors.darkMode_primary : colors.primary),
    (colorsForTheApp.backgroundColor =
      colorScheme === "light" ? "#ffffff" : "#000000"),
    (colorsForTheApp.textColor =
      colorScheme === "light" ? "#000000" : "#ffffff");
};

export const calculateColor = () => {
    colorScheme = useColorScheme();
    console.log('colorcalculator.js line 36 - the color is - ' + colorScheme)

//   useEffect(() => {
//     Appearance.addChangeListener(AppearanceChangeListener);
//     return () => {
//       Appearance.removeChangeListener(AppearanceChangeListener);
//     };
//   });
};

export default colorsForTheApp;
