import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import {
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import colorsForTheApp from "../components/ColorCalculator";
import CustomText from "../components/CustomText";
import SettingsScreenNavigation from "../navigation/SettingsScreenNavigation";
import {
  savechordsListInString,
  saveRootNoteForNoteMode,
  saveScale,
} from "../store/PracitceInfoSlice";

let windowWidthLocal;
let windowHeightLocal;
let scaleType = "";
let practiceType = "";
let rootNote = "";
let rootNoteForNoteMode = "";
let noteType = "";
let rootNotesList;
let chordsSelected = [];
let tempScale = [];

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  windowWidthLocal = useSelector(
    (state) => state.deviceInformation.windowWidth
  );

  windowHeightLocal = useSelector(
    (state) => state.deviceInformation.windowHeight
  );

  practiceType = useSelector((state) => state.practiceInformation.practiceType);

  scaleType = useSelector((state) => state.practiceInformation.scaleType);

  rootNote = useSelector((state) => state.practiceInformation.rootNote);

  rootNoteForNoteMode = useSelector(
    (state) => state.practiceInformation.rootNoteForNoteMode
  );

  console.log("settings.js line 42 - the root note is --- " + rootNote);

  chordsSelected = useSelector((state) => state.practiceInformation.chordTypes);

  noteType = useSelector((state) => state.practiceInformation.noteType);

  rootNotesList = useSelector(
    (state) => state.practiceInformation.rootNotesList
  );

  var chordsListInString = "";

  for (let index = 0; index < chordsSelected.length; index++) {
    const element = chordsSelected[index];
    if (index == 0) chordsListInString = element;
    else if (index > 0) chordsListInString = chordsListInString + "," + element;
  }
  dispatch(savechordsListInString(chordsListInString));

  // tempScale = []
  // var tempIndex = rootNotesList.indexOf(rootNote);
  // tempScale.push(rootNote)
  // for (let index = 1; index < 7; index++) {
  //   const element = tempScale[index];
  //   if (index != 3) {
  //     tempIndex += 2;
  //     if (tempIndex > 11) {
  //       tempIndex -= 12;
  //     }
  //     tempScale.push(rootNotesList[tempIndex]);
  //   } else {
  //     tempIndex += 1;
  //     if (tempIndex > 11) {
  //       tempIndex -= 12;
  //     }
  //     tempScale.push(rootNotesList[tempIndex]);
  //   }
  // }

  // dispatch(saveScale(tempScale));

  // Show Chords Settings, hide noteType
  if (practiceType === "Chords") {
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flex: 1,
            width: windowWidthLocal,
            backgroundColor: colorsForTheApp.backgroundColor,
            minHeight: windowHeightLocal,
          }}
        >
          <View
            style={
              ({ width: windowWidthLocal }, { ...styles.subHeadingPosition })
            }
          >
            <CustomText style={styles.subHeadingStyle}>
              Practice Setting
            </CustomText>
          </View>

          <View>
            {/* Practice Type */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("PracticeType");
              }}
              style={{
                width: windowWidthLocal,
                paddingBottom: 5,
                paddingTop: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 16 }}>
                      Practice Type
                    </CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 12, color: "grey" }}>
                      {practiceType}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>

            {/* Scale Type */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ScaleType");
              }}
              style={{ width: windowWidthLocal }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 18 }}>Scale Type</CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 13, color: "grey" }}>
                      {scaleType}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>

            {/* Root Note */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("RootNote");
              }}
              style={{ width: windowWidthLocal }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 18 }}>Root Note</CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 13, color: "grey" }}>
                      {rootNote}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>

            {/* Chords */}
            <TouchableOpacity
              onPress={() => {
                if (practiceType === "Chords") {
                  props.navigation.navigate("Chords");
                } else if (practiceType === "Notes") {
                  Alert.alert(
                    "Caution!",
                    "Please change 'Practice Type' to 'Chords' to select chords."
                  );
                }
              }}
              style={{ width: windowWidthLocal }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 9 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 18 }}>Chords</CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 13, color: "grey" }}>
                      {chordsListInString}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ width: windowWidthLocal, paddingTop: 10 }}>
            <Divider style={({}, { ...styles.dividerStyle })} />
          </View>

          <View
            style={
              ({ width: windowWidthLocal }, { ...styles.subHeadingPosition })
            }
          >
            <CustomText style={styles.subHeadingStyle}>App Setting</CustomText>
          </View>
          {/* <View style={{ width: windowWidthLocal, paddingTop: 10 }}>
        <Divider style={({}, { ...styles.dividerStyle })} />
      </View> */}
        </View>
      </ScrollView>
    );
  }
  // Hide root notes
  else if (
    practiceType === "Notes" &&
    (noteType === "All Notes" || noteType === "Only Natural Notes")
  ) {
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flex: 1,
            width: windowWidthLocal,
            backgroundColor: colorsForTheApp.backgroundColor,
            minHeight: windowHeightLocal,
          }}
        >
          <View
            style={
              ({ width: windowWidthLocal }, { ...styles.subHeadingPosition })
            }
          >
            <CustomText style={styles.subHeadingStyle}>
              Practice Setting
            </CustomText>
          </View>

          <View>
            {/* Practice Type */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("PracticeType");
              }}
              style={{
                width: windowWidthLocal,
                paddingBottom: 5,
                paddingTop: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 16 }}>
                      Practice Type
                    </CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 12, color: "grey" }}>
                      {practiceType}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>

            {/* Note Type */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("NoteType");
              }}
              style={{ width: windowWidthLocal }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 18 }}>Note Type</CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 13, color: "grey" }}>
                      {noteType}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ width: windowWidthLocal, paddingTop: 10 }}>
            <Divider style={({}, { ...styles.dividerStyle })} />
          </View>

          <View
            style={
              ({ width: windowWidthLocal }, { ...styles.subHeadingPosition })
            }
          >
            <CustomText style={styles.subHeadingStyle}>App Setting</CustomText>
          </View>
          {/* <View style={{ width: windowWidthLocal, paddingTop: 10 }}>
        <Divider style={({}, { ...styles.dividerStyle })} />
      </View> */}
        </View>
      </ScrollView>
    );
  }
  // Show Notes , hide Chords Settings, show root notes
  else if (
    practiceType === "Notes" &&
    !(noteType === "All Notes" || noteType === "Only Natural Notes")
  ) {
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flex: 1,
            width: windowWidthLocal,
            backgroundColor: colorsForTheApp.backgroundColor,
            minHeight: windowHeightLocal,
          }}
        >
          <View
            style={
              ({ width: windowWidthLocal }, { ...styles.subHeadingPosition })
            }
          >
            <CustomText style={styles.subHeadingStyle}>
              Practice Setting
            </CustomText>
          </View>

          <View>
            {/* Practice Type */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("PracticeType");
              }}
              style={{
                width: windowWidthLocal,
                paddingBottom: 5,
                paddingTop: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 16 }}>
                      Practice Type
                    </CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 12, color: "grey" }}>
                      {practiceType}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>

            {/* Note Type */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("NoteType");
              }}
              style={{ width: windowWidthLocal }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 18 }}>Note Type</CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 13, color: "grey" }}>
                      {noteType}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>

            {/* Root Note */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("RootNote");
              }}
              style={{ width: windowWidthLocal }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.labelStyle}>
                    <CustomText style={{ fontSize: 18 }}>Root Note</CustomText>
                  </View>
                  <View style={styles.descriptionStyle}>
                    <CustomText style={{ fontSize: 13, color: "grey" }}>
                      {rootNoteForNoteMode}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={23}
                    color={colorsForTheApp.textColor}
                  ></Ionicons>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ width: windowWidthLocal, paddingTop: 10 }}>
            <Divider style={({}, { ...styles.dividerStyle })} />
          </View>

          <View
            style={
              ({ width: windowWidthLocal }, { ...styles.subHeadingPosition })
            }
          >
            <CustomText style={styles.subHeadingStyle}>App Setting</CustomText>
          </View>
          {/* <View style={{ width: windowWidthLocal, paddingTop: 10 }}>
        <Divider style={({}, { ...styles.dividerStyle })} />
      </View> */}
        </View>
      </ScrollView>
    );
  }

  // console.log(windowWidthLocal);
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  subHeadingStyle: {
    fontSize: 20,
  },
  subHeadingPosition: {
    paddingLeft: 10,
    paddingTop: 10,
    // borderWidth: 1,
    // borderColor:'red'
  },
  dividerStyle: { borderWidth: 0.4, borderColor: "grey", opacity: 0.5 },
  labelStyle: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  nextIconStyle: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  descriptionStyle: {
    paddingLeft: 20,
    paddingTop: 3,
  },
});

export default SettingsScreen;
