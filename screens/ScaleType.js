import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Checkbox, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import colors from "../assets/colors/colors";
import colorsForTheApp from "../components/ColorCalculator";
import CustomCheckBox from "../components/CustomCheckBox";
import { RootNotes, ScaleType } from "../model/model";
import {
  saveScaleType,
  saveScale,
  saveRootNote,
  saveRootNoteSetFromSetting,
} from "../store/PracitceInfoSlice";

let windowWidthLocal;
let tempScale;
let scaleList;
let localFireChange = false;
let scaleSelectedList = [
  [true, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
];

const ScaleTypeScreen = () => {
  console.log("loading ScaleType screen ....");
  const [isChordChecked, SetIsChordChecked] = useState("checked");
  const [isNoteChecked, SetIsNoteChecked] = useState("unchecked");
  const [fireChange, SetFireChange] = useState(false);

  const dispatch = useDispatch();
  // const [scaleSelectedList, SetScaleSelectedList] = useState([
  //   [true, ""],
  //   [false, ""],
  //   [false, ""],
  //   [false, ""],
  //   [false, ""],
  //   [false, ""],
  //   [false, ""],
  // ]);

  windowWidthLocal = useSelector(
    (state) => state.deviceInformation.windowWidth
  );

  scaleList = useSelector((state) => state.practiceInformation.scaleTypeList);

  const rootNote = useSelector((state) => state.practiceInformation.rootNote);

  const rootNoteList = useSelector(
    (state) => state.practiceInformation.rootNotesList
  );

  for (let index = 0; index < scaleList.length; index++) {
    const element = scaleList[index];
    scaleSelectedList[index][1] = element;
  }

  const renderList = (itemData) => {
    //   console.log(itemData.item);

    return (
      <CustomCheckBox
        title={itemData.item[1]}
        onPress={onCheckboxPressed}
        index={itemData.index}
        isChecked={itemData.item[0]}
      />
    );
  };

  const onCheckboxPressed = (index) => {
    for (let index = 0; index < scaleSelectedList.length; index++) {
      scaleSelectedList[index][0] = false;
    }
    scaleSelectedList[index][0] = true;
    console.log(scaleSelectedList[index][1]);
    SetFireChange(!fireChange);
    dispatch(saveScaleType(scaleSelectedList[index][1]));
    // console.log("checkbox pressed..." + index);
    

    if (scaleSelectedList[index][1] === ScaleType[0]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNote);
      tempScale.push(rootNoteList[tempIndex]);
      for (let index = 1; index < 7; index++) {
        // const element = tempScale[index];
        if (index != 3) {
          tempIndex += 2;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        } else {
          tempIndex += 1;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        }
      }

      dispatch(saveScale(tempScale));
      dispatch(saveRootNote(rootNote));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (scaleSelectedList[index][1] === ScaleType[1]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNote) - 2;
      if (tempIndex < 0) tempIndex = 12 + tempIndex;

      // console.log("NoteType.js - line 127 - temporary index ----" + tempIndex);
      tempScale.push(rootNoteList[tempIndex]);
      for (let index = 1; index < 7; index++) {
        const element = tempScale[index];
        if (index != 3) {
          tempIndex += 2;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        } else {
          tempIndex += 1;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        }
      }

      dispatch(saveScale(tempScale));
      dispatch(saveRootNote(rootNote));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (scaleSelectedList[index][1] === ScaleType[2]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNote) - 4;
      if (tempIndex < 0) tempIndex = 12 + tempIndex;
      tempScale.push(rootNoteList[tempIndex]);
      for (let index = 1; index < 7; index++) {
        const element = tempScale[index];
        if (index != 3) {
          tempIndex += 2;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        } else {
          tempIndex += 1;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        }
      }

      dispatch(saveScale(tempScale));
      dispatch(saveRootNote(rootNote));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (scaleSelectedList[index][1] === ScaleType[3]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNote) - 5;
      if (tempIndex < 0) tempIndex = 12 + tempIndex;
      tempScale.push(rootNoteList[tempIndex]);
      for (let index = 1; index < 7; index++) {
        const element = tempScale[index];
        if (index != 3) {
          tempIndex += 2;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        } else {
          tempIndex += 1;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        }
      }

      dispatch(saveScale(tempScale));
      dispatch(saveRootNote(rootNote));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (scaleSelectedList[index][1] === ScaleType[4]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNote) - 7;
      if (tempIndex < 0) tempIndex = 12 + tempIndex;
      tempScale.push(rootNoteList[tempIndex]);
      for (let index = 1; index < 7; index++) {
        const element = tempScale[index];
        if (index != 3) {
          tempIndex += 2;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        } else {
          tempIndex += 1;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        }
      }

      dispatch(saveScale(tempScale));
      dispatch(saveRootNote(rootNote));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (scaleSelectedList[index][1] === ScaleType[5]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNote) - 9;
      if (tempIndex < 0) tempIndex = 12 + tempIndex;
      tempScale.push(rootNoteList[tempIndex]);
      for (let index = 1; index < 7; index++) {
        const element = tempScale[index];
        if (index != 3) {
          tempIndex += 2;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        } else {
          tempIndex += 1;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        }
      }

      dispatch(saveScale(tempScale));
      dispatch(saveRootNote(rootNote));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (scaleSelectedList[index][1] === ScaleType[6]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNote) - 11;
      if (tempIndex < 0) tempIndex = 12 + tempIndex;
      tempScale.push(rootNoteList[tempIndex]);
      for (let index = 1; index < 7; index++) {
        const element = tempScale[index];
        if (index != 3) {
          tempIndex += 2;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        } else {
          tempIndex += 1;
          if (tempIndex > 11) {
            tempIndex -= 12;
          }
          tempScale.push(rootNoteList[tempIndex]);
        }
      }

      dispatch(saveScale(tempScale));
      dispatch(saveRootNote(rootNote));
      dispatch(saveRootNoteSetFromSetting(true));
    }
    //    console.log(scaleSelectedList[1][1]);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, index) => item}
        style={styles.flatListStyle}
        data={scaleSelectedList}
        renderItem={renderList}
        numColumns={1}
      />
    </View>
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

export default ScaleTypeScreen;
