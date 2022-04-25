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
import { NotesType, PracticeType, ScaleType } from "../model/model";
import {
  saveRootNote,
  saveScale,
  saveRootNoteSetFromSetting,
  saveRootNoteForNoteMode,
} from "../store/PracitceInfoSlice";
// NotesType

let tempScale = [];
let practiceType;
let windowWidthLocal;
let rootNotes;
let localFireChange = false;
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

const RootNote = () => {
  console.log("loading RootNote screen ....");
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

  const rootNote = useSelector((state) => state.practiceInformation.rootNote);

  windowWidthLocal = useSelector(
    (state) => state.deviceInformation.windowWidth
  );

  rootNotes = useSelector((state) => state.practiceInformation.rootNotesList);

  practiceType = useSelector((state) => state.practiceInformation.practiceType);

  const scaleType = useSelector((state) => state.practiceInformation.scaleType);

  const noteType = useSelector((state) => state.practiceInformation.noteType);
  const rootNoteList = useSelector(
    (state) => state.practiceInformation.rootNotesList
  );

  for (let index = 0; index < rootNotes.length; index++) {
    const element = rootNotes[index];
    rootSelectedList[index][1] = element;
  }

  const renderList = (itemData) => {
    //  console.log(itemData.item);

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
    for (let index = 0; index < rootSelectedList.length; index++) {
      rootSelectedList[index][0] = false;
    }
    rootSelectedList[index][0] = true;
    
    dispatch(saveRootNoteSetFromSetting(true));
    
    SetFireChange(!fireChange);

    if (practiceType === PracticeType[0]) {
      dispatch(saveRootNoteForNoteMode(rootSelectedList[index][1]));
      if (noteType === NotesType[2]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]);
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
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[3]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 2;
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
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[4]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 4;
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
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[5]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 5;
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
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[6]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 7;
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
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[7]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 9;
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
        // dispatch(saveRootNote(rootNote));
      } else if (noteType === NotesType[8]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 11;
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
        // dispatch(saveRootNote(rootNote));
      }
    } else if (practiceType === PracticeType[1]) {
      dispatch(saveRootNote(rootSelectedList[index][1]));
      if (scaleType === ScaleType[0]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]);
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
      } else if (scaleType === ScaleType[1]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 2;
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
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[2]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 4;
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
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[3]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 5;
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
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[4]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 7;
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
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[5]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 9;
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
        // dispatch(saveRootNote(rootNote));
      } else if (scaleType === ScaleType[6]) {
        tempScale = [];
        var tempIndex = rootNoteList.indexOf(rootSelectedList[index][1]) - 11;
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
        // dispatch(saveRootNote(rootNote));
      }
    }
    // tempScale = [];
    // var tempIndex = rootNotes.indexOf(rootSelectedList[index][1]);
    // tempScale.push(rootSelectedList[index][1]);
    // for (let index = 1; index < 7; index++) {
    //   const element = tempScale[index];
    //   if (index != 3) {
    //     tempIndex += 2;
    //     if (tempIndex > 11) {
    //       tempIndex -= 12;
    //     }
    //     tempScale.push(rootNotes[tempIndex]);
    //   } else {
    //     tempIndex += 1;
    //     if (tempIndex > 11) {
    //       tempIndex -= 12;
    //     }
    //     tempScale.push(rootNotes[tempIndex]);
    //   }
    // }

    // dispatch(saveScale(tempScale));
    // console.log("checkbox pressed..." + index);

    //    console.log(scaleSelectedList[1][1]);
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item}
      style={styles.flatListStyle}
      data={rootSelectedList}
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

export default RootNote;
