import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import HomeScreen from "../screens/Home";
import PracticeType from "../screens/PracticeType";
import SettingsScreen from "../screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import ScaleTypeScreen from "../screens/ScaleType";
import RootNote from "../screens/RootNote";
import Chords from "../screens/Chords";
import { useSelector } from "react-redux";
import NoteType from "../screens/NoteType";
import colors from "../assets/colors/colors";
import colorsForTheApp from "../components/ColorCalculator";


const SettingsScreenNavigation = () => {

const chordTypesList = useSelector(
  (state) => state.practiceInformation.chordTypes
);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, headerTitleAlign: "center", headerStyle: {
          backgroundColor: colorsForTheApp.primaryColor,
          
      } }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        options={({ route, navigation }) => ({
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back-outline"
                onPress={() => {
                  // console.log(navigation);
                  navigation.pop();
                }}
                size={25}
              />
            );
          },
        })}
        name="PracticeType"
        component={PracticeType}
      />
      <Stack.Screen
        options={({ route, navigation }) => ({
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back-outline"
                onPress={() => {
                  // console.log(navigation);
                  navigation.pop();
                }}
                size={25}
              />
            );
          },
        })}
        name="ScaleType"
        component={ScaleTypeScreen}
      />
      <Stack.Screen
        options={({ route, navigation }) => ({
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back-outline"
                onPress={() => {
                  // console.log(navigation);
                  navigation.pop();
                }}
                size={25}
              />
            );
          },
        })}
        name="NoteType"
        component={NoteType}
      />
      <Stack.Screen
        options={({ route, navigation }) => ({
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back-outline"
                onPress={() => {
                  // console.log(navigation);
                  navigation.pop();
                }}
                size={25}
              />
            );
          },
        })}
        name="RootNote"
        component={RootNote}
      />
      <Stack.Screen
        options={({ route, navigation }) => ({
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back-outline"
                onPress={() => {
                  // console.log(navigation);
                  if (chordTypesList.length == 0) {
                    Alert.alert(
                      "Caution!",
                      "Please select at least one type of chord."
                    );
                  } else navigation.pop();
                }}
                size={25}
              />
            );
          },
        })}
        name="Chords"
        component={Chords}
      />
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

export default SettingsScreenNavigation;
