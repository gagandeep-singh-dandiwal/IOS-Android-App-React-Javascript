import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import colorsForTheApp from "../components/ColorCalculator";
import HomeScreen from "../screens/Home";

const HomeScreenNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colorsForTheApp.primaryColor,
        },
        headerTitleAlign: 'center',
        
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default HomeScreenNavigation;
