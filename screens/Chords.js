import { useFocusEffect } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Checkbox, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import colors from "../assets/colors/colors";
import colorsForTheApp from "../components/ColorCalculator";
import CustomCheckBox from "../components/CustomCheckBox";
import CustomMutltipleSelectionCheckBox from "../components/CustomMutltipleSelectionCheckBox";
import {
  saveChords,
  saveChordsSelectedList,
  saveRootNoteSetFromSetting,
} from "../store/PracitceInfoSlice";



let windowWidthLocal;
let chordTypesList;
let localFireChange = false;
let chordsSelectedList = [
  [true, ""],
  [true, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
];
let chordListToSave = [];

const Chords = () => {
  const [isChordChecked, SetIsChordChecked] = useState("checked");
  const [isNoteChecked, SetIsNoteChecked] = useState("unchecked");
  const [fireChange, SetFireChange] = useState(false);
  // const [scaleSelectedList, SetScaleSelectedList] = useState([
  //   [true, ""],
  //   [false, ""],
  //   [false, ""],
  //   [false, ""],
  //   [false, ""],
  //   [false, ""],
  //   [false, ""],
  // ]);

  const dispatch = useDispatch();

  windowWidthLocal = useSelector(
    (state) => state.deviceInformation.windowWidth
  );

  chordTypesList = useSelector(
    (state) => state.practiceInformation.chordTypesList
  );

  for (let index = 0; index < chordTypesList.length; index++) {
    const element = chordTypesList[index];
    chordsSelectedList[index][1] = element;
  }

  console.log(chordsSelectedList);

  const renderList = (itemData) => {
    // console.log(itemData.item);

    return (
      <CustomMutltipleSelectionCheckBox
        title={itemData.item[1]}
        onPress={onCheckboxPressed}
        index={itemData.index}
        isChecked={itemData.item[0]}
      />
    );
  };

  const onCheckboxPressed = (index) => {
    // for (let index = 0; index < rootSelectedList.length; index++) {
    //   rootSelectedList[index][0] = false;
    // }

    chordsSelectedList[index][0] = !chordsSelectedList[index][0];
    // console.log("checkbox pressed..." + index);
    chordListToSave = [];
    for (let index = 0; index < chordsSelectedList.length; index++) {
      if (chordsSelectedList[index][0]) {
        chordListToSave.push(chordsSelectedList[index][1]);
      }
    }
    // console.log(chordListToSave);
    dispatch(saveChords(chordListToSave));
    dispatch(saveRootNoteSetFromSetting(true));

    // dispatch(saveChordsSelectedList(chordsSelectedList));
    SetFireChange(!fireChange);
    //    console.log(scaleSelectedList[1][1]);
  };

  useFocusEffect(

    React.useCallback(() => {
      //  alert("Screen was focused");
      // Do something when the screen is focused
      return () => {
        //  alert("Screen was unfocused");
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('chords.js line 116 - chordList to Save - ' + chordListToSave)
        if (chordListToSave.length == 0) {
          Alert.alert("Caution!", "Please select at least one type of chord.");
        }
          
    
      };
    }, [])
  );

  return (
    <FlatList
      keyExtractor={(item, index) => item}
      style={styles.flatListStyle}
      data={chordsSelectedList}
      renderItem={renderList}
      numColumns={1}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
  },
  itemHolderStyle: {
    flexDirection: "row",
    padding: 10,
  },
  flatListStyle: {backgroundColor:colorsForTheApp.backgroundColor},
});

export default Chords;
