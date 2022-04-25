import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/Home";
import SettingScreen from "../screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreenNavigation from "./HomeScreenNavigation";
import SettingsScreenNavigation from "./SettingsScreenNavigation";
import { Ionicons } from "@expo/vector-icons";

const BottomMaterialTabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;

            if (route.name === "HomeNavigation") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "SettingsNavigation") {
              iconName = focused ? "settings" : "settings-outline";
            }
            return (
              <Ionicons name={iconName} size={23} color="white"></Ionicons>
            );
          },
        initialRouteName: "Home",
        
        })}
      >
        <Tab.Screen
          name="HomeNavigation"
          component={HomeScreenNavigation}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="SettingsNavigation"
          component={SettingsScreenNavigation}
          options={{ title: "Settings" }}
        />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default BottomMaterialTabNavigation;
