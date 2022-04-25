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
import { AllNotes, NaturalNotes, NotesType, RootNotes } from "../model/model";
import {
  saveNoteType,
  saveRootNote,
  saveScale,
  saveRootNoteSetFromSetting,
  saveRootNoteForNoteMode
} from "../store/PracitceInfoSlice";

let windowWidthLocal;
let tempScale = [];
let noteTypeList;
let localFireChange = false;
let noteTypeSelectedList = [
  [true, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
];

const NoteType = () => {
  console.log("loading NoteType screen ....");

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

  noteTypeList = useSelector((state) => state.practiceInformation.noteTypeList);
  const rootNoteForNoteMode = useSelector(
    (state) => state.practiceInformation.rootNoteForNoteMode
  );
  const rootNoteList = useSelector(
    (state) => state.practiceInformation.rootNotesList
  );

  for (let index = 0; index < noteTypeList.length; index++) {
    const element = noteTypeList[index];
    noteTypeSelectedList[index][1] = element;
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
    for (let index = 0; index < noteTypeSelectedList.length; index++) {
      noteTypeSelectedList[index][0] = false;
    }
    noteTypeSelectedList[index][0] = true;
    // console.log(scaleSelectedList[index][1]);
    // dispatch(saveNoteType(noteTypeSelectedList[index][1]));
    // console.log("checkbox pressed..." + index);
    SetFireChange(!fireChange);

    dispatch(saveNoteType(noteTypeSelectedList[index][1]));
    if (noteTypeSelectedList[index][1] === NotesType[0]) {
      dispatch(saveScale(NaturalNotes));
      dispatch(saveRootNoteForNoteMode(RootNotes[0]));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (noteTypeSelectedList[index][1] === NotesType[1]) {
      dispatch(saveScale(AllNotes));
      dispatch(saveRootNoteForNoteMode(RootNotes[0]));
      dispatch(saveRootNoteSetFromSetting(true));
    }
    
    // Major Scale
    else if (noteTypeSelectedList[index][1] === NotesType[2]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNoteForNoteMode);
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
      dispatch(saveRootNoteForNoteMode(rootNoteForNoteMode));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (noteTypeSelectedList[index][1] === NotesType[3]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNoteForNoteMode) - 2;
      if (tempIndex < 0) tempIndex = 12 + tempIndex;

      console.log("NoteType.js - line 127 - temporary index ----" + tempIndex);
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
      dispatch(saveRootNoteForNoteMode(rootNoteForNoteMode));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (noteTypeSelectedList[index][1] === NotesType[4]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNoteForNoteMode) - 4;
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
      dispatch(saveRootNoteForNoteMode(rootNoteForNoteMode));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (noteTypeSelectedList[index][1] === NotesType[5]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNoteForNoteMode) - 5;
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
      dispatch(saveRootNoteForNoteMode(rootNoteForNoteMode));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (noteTypeSelectedList[index][1] === NotesType[6]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNoteForNoteMode) - 7;
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
      dispatch(saveRootNoteForNoteMode(rootNoteForNoteMode));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (noteTypeSelectedList[index][1] === NotesType[7]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNoteForNoteMode) - 9;
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
      dispatch(saveRootNoteForNoteMode(rootNoteForNoteMode));
      dispatch(saveRootNoteSetFromSetting(true));
    } else if (noteTypeSelectedList[index][1] === NotesType[8]) {
      tempScale = [];
      var tempIndex = rootNoteList.indexOf(rootNoteForNoteMode) - 11;
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
      dispatch(saveRootNoteForNoteMode(rootNoteForNoteMode));
      dispatch(saveRootNoteSetFromSetting(true));
    }
    //    console.log(scaleSelectedList[1][1]);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, index) => item}
        style={styles.flatListStyle}
        data={noteTypeSelectedList}
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
    backgroundColor:colorsForTheApp.backgroundColor
  },
  itemHolderStyle: {
    flexDirection: "row",
    padding: 10,
  },
  flatListStyle: {},
});

export default NoteType;
