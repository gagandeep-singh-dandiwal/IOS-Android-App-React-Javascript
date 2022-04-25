import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import HomeScreen from "../screens/Home";
import SettingScreen from "../screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreenNavigation from "./HomeScreenNavigation";
import SettingsScreenNavigation from "./SettingsScreenNavigation";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/Settings";
import colors from "../assets/colors/colors";
import colorsForTheApp from "../components/ColorCalculator";

const BottomNavigation = () => {
  const BottomTab = createBottomTabNavigator();

  return (
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, focused, size }) => {
              let iconName;

              if (route.name === "HomeNavigation") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "SettingsNavigation") {
                iconName = focused ? "settings" : "settings-outline";
              }
              return (
                <Ionicons name={iconName} size={size} color={color}></Ionicons>
              );
          },
            
            tabBarActiveTintColor: colorsForTheApp.primaryColor,
            tabBarInactiveTintColor: "grey",
            headerShown: false,
            // headerShown: route.name === "HomeNavigation" ? true : false,
            initialRouteName: "Home",
            headerTitleStyle: { textAlign: "center" },
          headerTitleAlign: "center",
          tabBarStyle: { backgroundColor: colorsForTheApp.backgroundColor },
          
          })}
        >
          <BottomTab.Screen
            name="HomeNavigation"
            component={HomeScreenNavigation}
            options={{
              title: "Home",
              headerStyle: {
                backgroundcolor: colorsForTheApp.primaryColor,
              },
              headerTitleAlign: "center",
              
            }}
          />
          <BottomTab.Screen
            name="SettingsNavigation"
            component={SettingsScreenNavigation}
            options={(route, navigation) => ({
              title: "Settings",
              headerShown: false,
            })}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default BottomNavigation;
