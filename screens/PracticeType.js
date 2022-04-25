import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Checkbox, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import colors from "../assets/colors/colors";
import colorsForTheApp from "../components/ColorCalculator";
import CustomCheckBox from "../components/CustomCheckBox";
import { NotesType, NaturalNotes, AllNotes, RootNotes,ScaleType } from "../model/model";
import { savePracticeType, saveRootNoteForNoteMode } from "../store/PracitceInfoSlice";
import {
  saveNoteType,
  saveRootNote,
  saveScale,
  saveRootNoteSetFromSetting,
} from "../store/PracitceInfoSlice";



let windowWidthLocal;
let practiceTypeList;
let localFireChange = false;
let practiceTypeSelectedList = [
  [false, ""],
  [true, ""],
];
let noteType;
let tempScale;
let rootSelectedList = [
  [true, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
  [false, ""],
];

const PracticeType = (props) => {
  const [isChordChecked, SetIsChordChecked] = useState("checked");
  const [isNoteChecked, SetIsNoteChecked] = useState("unchecked");
  const [fireChange, SetFireChange] = useState(false);
  const scaleType = useSelector((state) => state.practiceInformation.scaleType);
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

  practiceTypeList = useSelector(
    (state) => state.practiceInformation.practiceTypeList
  );

  noteType = useSelector((state) => state.practiceInformation.noteType);

  const rootNoteList = useSelector(
    (state) => state.practiceInformation.rootNotesList
  );

  

  const rootNote = useSelector((state) => state.practiceInformation.rootNote);
  const rootNoteForNoteMode = useSelector(
    (state) => state.practiceInformation.rootNoteForNoteMode
  );
  // console.log('pracitceType.js line 50 - note type is -- ' + noteType)

  for (let index = 0; index < practiceTypeList.length; index++) {
    const element = practiceTypeList[index];
    practiceTypeSelectedList[index][1] = element;
  }

  const renderList = (itemData) => {
    // console.log(itemData.item);

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
    for (let index = 0; index < practiceTypeSelectedList.length; index++) {
      practiceTypeSelectedList[index][0] = false;
    }
    practiceTypeSelectedList[index][0] = true;
    dispatch(savePracticeType(practiceTypeSelectedList[index][1]));
    

    if (practiceTypeSelectedList[index][1] === practiceTypeList[0]) {
      if (noteType === NotesType[0]) {
        dispatch(saveScale(NaturalNotes));
        dispatch(saveRootNoteForNoteMode(RootNotes[0]));
        dispatch(saveRootNoteSetFromSetting(true));
      } else if (noteType === NotesType[1]) {
        dispatch(saveScale(AllNotes));
        dispatch(saveRootNoteForNoteMode(RootNotes[0]));
        dispatch(saveRootNoteSetFromSetting(true));
      } else if (noteType === NotesType[2]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[3]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootNoteForNoteMode) - 2;
        if (tempIndex < 0) tempIndex = 12 + tempIndex;

        console.log(
          "NoteType.js - line 127 - temporary index ----" + tempIndex
        );
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[4]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[5]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[6]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[7]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[8]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      }
    } else if (practiceTypeSelectedList[index][1] === practiceTypeList[1]) {
      if (scaleType === ScaleType[0]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
      } else if (scaleType === ScaleType[1]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootNote) - 2;
        if (tempIndex < 0) tempIndex = 12 + tempIndex;

        console.log(
          "NoteType.js - line 127 - temporary index ----" + tempIndex
        );
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[2]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[3]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[4]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[5]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[6]) {
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
        dispatch(saveRootNoteSetFromSetting(true));
        // dispatch(saveRootNote(rootNote));
      }
    }

    // console.log("checkbox pressed..." + index);
    SetFireChange(!fireChange);
    // props.navigation.pop();
    // console.log(props.navigation.pop());
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item}
      style={styles.flatListStyle}
      data={practiceTypeSelectedList}
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

export default PracticeType;
