import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  AppState,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
// import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { windowHeight } from "../store/DeviceInformationSlice";
import {
  NaturalNotes,
  AllNotes,
  PracticeType,
  RootNotes,
  ChordInAScale,
  ChordTypes,
  NotesType,
} from "../model/model";
import ReactButton from "../components/ReactButton";
import LeftRadioButton from "../components/LeftRadioButton";

import { TouchableOpacity } from "react-native-gesture-handler";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import RightRadioButton from "../components/RightRadioButton";
import enabledRadiobutton from "../assets/images/gagan_radibutton.png";
import gagan_inactive_radiobutton from "../assets/images/gagan_inactive_radiobutton.png";
import colors from "../assets/colors/colors";
import { saveRootNoteSetFromSetting } from "../store/PracitceInfoSlice";
import { Howl, Howler } from "howler";
import one from "../assets/audio/one.mp3";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import EStyleSheet from "react-native-extended-stylesheet";
import colorScheme from "../components/ColorCalculator";
import colorsForTheApp from "../components/ColorCalculator";
import CustomText from "../components/CustomText";

var isRunning = false;
let windowWidthLocal;
let windowHeightLocal;
let platform;
var intervalId;
var intervalIdMetronome;
var tempoLocal = 50;
var theScaleNotes = [];
var prevNote = "";
var prevNum;
var localIsLeftButtonTurn = false;
var localIsRightButtonTurn = false;
var times = [];
let indexForChord = 0;
var val = theScaleNotes[0];
var num = 0;
var sharpValue = "";
var test = PracticeType;
var chordsToDisplayAccordingToSelected = [[], [], [], [], [], [], []];
var noteDegreesWhoseChordsAreSelected = [];
var chordToDisplayNonRepeatingList = [];
var theScaleDegreesBasedOnSelectedChords = [];
var globalcount;
var eventSubscription;
var rootNoteForDescription;
var scaleTypeForDescription;
var practiceType;

// const getTheScaleBeforeOnly = () => {
//   test = useSelector((state) => state.practiceInformation.theScale);
// }

const descriptionView = () => {
  if (practiceType === PracticeType[0]) {
    <View style={styles.descriptionViewStyleIOS}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "90%",
          paddingTop: 10,
        }}
      >
        <View>
          <Text>
            Pratice Type : <Text>{practiceType}</Text>
          </Text>
        </View>

        <View>
          <Text>
            Scale : <Text>{scaleTypeForDescription}</Text>
          </Text>
        </View>

        <View>
          <Text>
            Root Note : <Text>{rootNoteForDescription}</Text>
          </Text>
        </View>
      </View>
    </View>;
  } else {
    <View style={styles.descriptionViewStyleIOS}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "90%",
          paddingTop: 10,
        }}
      >
        <View>
          <Text>
            Pratice Type : <Text>{practiceType}</Text>
          </Text>
        </View>

        <View>
          <Text>
            Scale : <Text>{scaleTypeForDescription}</Text>
          </Text>
        </View>

        <View>
          <Text>
            Chords : <Text>{chordsListInString}</Text>
          </Text>
        </View>

        <View>
          <Text>
            Root Note : <Text>{rootNoteForDescription}</Text>
          </Text>
        </View>
      </View>
    </View>;
  }
};

const HomeScreen = () => {
  // getTheScaleBeforeOnly();
  // console.log(
  // "Home.js line 45 - test value is -- " + chordToDisplayNonRepeatingList);
  const isHomeScreenFocused = useIsFocused();
  const rootNote = useSelector((state) => state.practiceInformation.rootNote);
  const rootNoteForNoteMode = useSelector(
    (state) => state.practiceInformation.rootNoteForNoteMode
  );
  practiceType = useSelector((state) => state.practiceInformation.practiceType);
  const scaleType = useSelector((state) => state.practiceInformation.scaleType);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const height = useSelector((state) => state.deviceInformation.windowHeight);
  theScaleNotes = useSelector((state) => state.practiceInformation.theScale);

  const [firstBeat, SetFirstBeat] = useState(false);
  const [note, SetNote] = useState(rootNote);
  const [rootNoteToDisplay, SetRootNoteToDisplay] = useState(() => {
    if (rootNote.includes("#")) {
      return rootNote[0];
    } else {
      return rootNote;
    }
  });

  const [sharp, SetSharp] = useState(() => {
    if (rootNote.includes("#")) {
      return "#";
    } else {
      return "";
    }
  });
  const [chordValue, SetChordValue] = useState(() => {
    if (practiceType === PracticeType[1]) {
      indexForChord = theScaleNotes.indexOf(rootNote);
      return ChordInAScale[indexForChord][0];
    } else return "";
  });
  const [buttonTitle, SetButtonTitle] = useState("Start");
  const [count, SetCount] = useState(0);
  const [tempo, SetTempo] = useState(50);
  const [isLeftButtonTurn, SetIsLeftButtonTurn] = useState(false);
  const [isRightButtonTurn, SetisRightButtonTurn] = useState(false);
  const [rightRadioButtonDisabled, SetLightRadioButtonDisabled] =
    useState(false);

  const dispatch = useDispatch();

  windowWidthLocal = useSelector(
    (state) => state.deviceInformation.windowWidth
  );

  windowHeightLocal = useSelector(
    (state) => state.deviceInformation.windowHeight
  );

  platform = useSelector((state) => state.deviceInformation.platform);

  chordsListInString = useSelector(
    (state) => state.practiceInformation.chordsListInString
  );

  const noteType = useSelector((state) => state.practiceInformation.noteType);

  if (practiceType === PracticeType[0]) {
    if (noteType === NotesType[0] || noteType === NotesType[1]) {
      rootNoteForDescription = "-";
    } else rootNoteForDescription = rootNoteForNoteMode;
    scaleTypeForDescription = noteType;
  } else {
    rootNoteForDescription = rootNote;
    scaleTypeForDescription = scaleType;
  }

  // console.log("-------------------------");
  // console.log("line 137 home.js - width is " + windowWidthLocal);
  // console.log("line 137 home.js - height is " + windowHeightLocal);
  // console.log("line 137 home.js - platform is " + platform);

  const RootNotesetFromSetting = useSelector(
    (state) => state.practiceInformation.rootNoteSetfromSetting
  );

  const chordTypes = useSelector(
    (state) => state.practiceInformation.chordTypes
  );

  const chordsSelectedList = useSelector(
    (state) => state.practiceInformation.chordsSelectedList
  );

  const LeftRadioButtonLocal = () => {
    if (buttonTitle === "Stop" && isLeftButtonTurn) {
      return (
        <Image
          style={styles.radioButtonStyle}
          source={enabledRadiobutton}
        ></Image>
      );
    } else {
      return (
        <Image
          style={styles.radioButtonStyle}
          source={gagan_inactive_radiobutton}
        ></Image>
      );
    }
  };

  const onStartPress = () => {
    globalcount = 0;
    if (buttonTitle === "Start") {
      isRunning = true;
      times.push(Date.now());
      SetButtonTitle("Stop");

      if (practiceType === PracticeType[0]) {
        for (let index = 0; index < 1000; index++) {
          if (index > 0) {
            var noteToStore =
              theScaleNotes[Math.floor(Math.random() * theScaleNotes.length)];
            if (
              chordToDisplayNonRepeatingList[index - 1] === noteToStore &&
              theScaleNotes.length > 1
            ) {
              while (
                chordToDisplayNonRepeatingList[index - 1] === noteToStore
              ) {
                noteToStore =
                  theScaleNotes[
                    Math.floor(Math.random() * theScaleNotes.length)
                  ];
              }
            }
            chordToDisplayNonRepeatingList[index] = noteToStore;
          } else if (index == 0) {
            var firstNote =
              theScaleNotes[Math.floor(Math.random() * theScaleNotes.length)];

            while (firstNote === theScaleNotes[0]) {
              firstNote =
                theScaleNotes[Math.floor(Math.random() * theScaleNotes.length)];
            }
            chordToDisplayNonRepeatingList[index] = firstNote;
          }
        }
        const theNote = chordToDisplayNonRepeatingList[globalcount];
        if (theNote.includes("#")) {
          SetRootNoteToDisplay(theNote[0]);
          SetSharp("#");
        } else {
          SetRootNoteToDisplay(theNote);
          SetSharp("");
        }
        // setTimeout(() => {
        //   SetIsLeftButtonTurn(!localIsLeftButtonTurn);
        //   localIsRightButtonTurn = localIsLeftButtonTurn;
        //   SetisRightButtonTurn(localIsRightButtonTurn);
        //   localIsLeftButtonTurn = !localIsLeftButtonTurn;
        // }, 60000 / tempo);
        // SetNote(theScaleNotes[Math.floor(Math.random() * theScaleNotes.length)]);
        // prevNote = rootNote;
      } else if (practiceType === PracticeType[1]) {
        if (chordTypes.length == 0) {
          SetButtonTitle("Start");
          Alert.alert("Caution!", "Please select at least one type of chord.");
          return;
        }
        chordsToDisplayAccordingToSelected.forEach((item) => {
          item = [];
        });

        chordTypes.forEach((item) => {
          if (item == ChordTypes[0]) {
            chordsToDisplayAccordingToSelected[0].push(item);
            chordsToDisplayAccordingToSelected[3].push(item);
            chordsToDisplayAccordingToSelected[4].push(item);

            theScaleDegreesBasedOnSelectedChords.push(0);
            theScaleDegreesBasedOnSelectedChords.push(3);
            theScaleDegreesBasedOnSelectedChords.push(4);
          } else if (item == ChordTypes[1]) {
            chordsToDisplayAccordingToSelected[1].push(item);
            chordsToDisplayAccordingToSelected[2].push(item);
            chordsToDisplayAccordingToSelected[5].push(item);
            theScaleDegreesBasedOnSelectedChords.push(1);
            theScaleDegreesBasedOnSelectedChords.push(2);
            theScaleDegreesBasedOnSelectedChords.push(5);
          } else if (item == ChordTypes[2]) {
            chordsToDisplayAccordingToSelected[6].push(item);
            theScaleDegreesBasedOnSelectedChords.push(6);
          } else if (item == ChordTypes[3]) {
            chordsToDisplayAccordingToSelected[0].push(item);
            chordsToDisplayAccordingToSelected[3].push(item);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(0) == -1)
              theScaleDegreesBasedOnSelectedChords.push(0);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(3) == -1)
              theScaleDegreesBasedOnSelectedChords.push(3);
          } else if (item == ChordTypes[4]) {
            chordsToDisplayAccordingToSelected[1].push(item);
            chordsToDisplayAccordingToSelected[2].push(item);
            chordsToDisplayAccordingToSelected[5].push(item);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(1) == -1)
              theScaleDegreesBasedOnSelectedChords.push(1);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(2) == -1)
              theScaleDegreesBasedOnSelectedChords.push(2);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(5) == -1)
              theScaleDegreesBasedOnSelectedChords.push(5);
          } else if (item == ChordTypes[5]) {
            chordsToDisplayAccordingToSelected[4].push(item);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(4) == -1)
              theScaleDegreesBasedOnSelectedChords.push(4);
          } else if (item == ChordTypes[6]) {
            chordsToDisplayAccordingToSelected[0].push(item);
            chordsToDisplayAccordingToSelected[1].push(item);
            chordsToDisplayAccordingToSelected[3].push(item);
            chordsToDisplayAccordingToSelected[4].push(item);
            chordsToDisplayAccordingToSelected[5].push(item);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(0) == -1)
              theScaleDegreesBasedOnSelectedChords.push(0);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(1) == -1)
              theScaleDegreesBasedOnSelectedChords.push(1);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(3) == -1)
              theScaleDegreesBasedOnSelectedChords.push(3);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(4) == -1)
              theScaleDegreesBasedOnSelectedChords.push(4);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(5) == -1)
              theScaleDegreesBasedOnSelectedChords.push(5);
          } else if (item == ChordTypes[7]) {
            chordsToDisplayAccordingToSelected[0].push(item);
            chordsToDisplayAccordingToSelected[1].push(item);
            chordsToDisplayAccordingToSelected[2].push(item);
            chordsToDisplayAccordingToSelected[4].push(item);
            chordsToDisplayAccordingToSelected[5].push(item);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(0) == -1)
              theScaleDegreesBasedOnSelectedChords.push(0);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(1) == -1)
              theScaleDegreesBasedOnSelectedChords.push(1);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(2) == -1)
              theScaleDegreesBasedOnSelectedChords.push(2);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(4) == -1)
              theScaleDegreesBasedOnSelectedChords.push(4);
            if (theScaleDegreesBasedOnSelectedChords.indexOf(5) == -1)
              theScaleDegreesBasedOnSelectedChords.push(5);
          }
        });

        for (let index = 0; index < 1000; index++) {
          if (index > 0) {
            var noteToStore =
              theScaleDegreesBasedOnSelectedChords[
                Math.floor(
                  Math.random() * theScaleDegreesBasedOnSelectedChords.length
                )
              ];
            if (
              chordToDisplayNonRepeatingList[index - 1] ===
                theScaleNotes[noteToStore] &&
              theScaleDegreesBasedOnSelectedChords.length > 1
            ) {
              while (
                chordToDisplayNonRepeatingList[index - 1] ===
                theScaleNotes[noteToStore]
              ) {
                noteToStore =
                  theScaleDegreesBasedOnSelectedChords[
                    Math.floor(
                      Math.random() *
                        theScaleDegreesBasedOnSelectedChords.length
                    )
                  ];
              }
            }
            chordToDisplayNonRepeatingList[index] = theScaleNotes[noteToStore];
          } else if (index == 0) {
            chordToDisplayNonRepeatingList[index] =
              theScaleNotes[
                theScaleDegreesBasedOnSelectedChords[
                  Math.floor(
                    Math.random() * theScaleDegreesBasedOnSelectedChords.length
                  )
                ]
              ];
          }
        }

        const theNote = chordToDisplayNonRepeatingList[globalcount];

        if (theNote.includes("#")) {
          SetRootNoteToDisplay(theNote[0]);
          SetSharp("#");
        } else {
          SetRootNoteToDisplay(theNote);
          SetSharp("");
        }

        var num = theScaleNotes.indexOf(theNote);

        SetChordValue(
          chordsToDisplayAccordingToSelected[num][
            Math.floor(
              Math.random() * chordsToDisplayAccordingToSelected[num].length
            )
          ]
        );
        prevNum = num;
        // setTimeout(() => {
        //   SetIsLeftButtonTurn(!localIsLeftButtonTurn);
        //   localIsRightButtonTurn = localIsLeftButtonTurn;
        //   SetisRightButtonTurn(localIsRightButtonTurn);
        //   localIsLeftButtonTurn = !localIsLeftButtonTurn;
        // }, 60000 / tempo);
      }

      SetIsLeftButtonTurn(true);
      localIsLeftButtonTurn = true;
      // intervalId = setInterval(SetDisplayNote, 120000 / tempoLocal);
      intervalIdMetronome = setInterval(SetMetronomeClicks, 60000 / tempoLocal);
      // intervalIdMetronome = setInterval(SetMetronomeClicks, 60000 / tempo);
    } else if (buttonTitle === "Stop") {
      isRunning = false;
      dispatch(saveRootNoteSetFromSetting(false));
      SetButtonTitle("Start");
      //console.log(intervalId);
      clearInterval(intervalId);
      clearInterval(intervalIdMetronome);
      intervalId = null;
      // console.log("Stoppppped");
      SetIsLeftButtonTurn(false);
      SetisRightButtonTurn(false);
      localIsLeftButtonTurn = false;
      localIsRightButtonTurn = false;
      // chordsToDisplayAccordingToSelected.forEach((item) => {
      //   console.log('item before - ' + item)
      //   item = [];
      //   console.log('item after - ' + item);

      // });
      chordsToDisplayAccordingToSelected = [[], [], [], [], [], [], []];
      theScaleDegreesBasedOnSelectedChords = [];
      chordToDisplayNonRepeatingList = [];

      // console.log('after clearing --- ' + chordsToDisplayAccordingToSelected);
      for (let index = 0; index < times.length - 1; index++) {
        const element = times[index + 1] - times[index];
        console.log(element);
      }
      times = [];
    }
  };

  const SetDisplayNote = () => {
    // SetIsLeftButtonTurn(!localIsLeftButtonTurn);
    // localIsRightButtonTurn = localIsLeftButtonTurn;
    // SetisRightButtonTurn(localIsRightButtonTurn);
    // localIsLeftButtonTurn = !localIsLeftButtonTurn;

    if (intervalIdMetronome != null) {
      // console.log(
      //   "home .js line 397 - interval id of metronome is --- " +
      //     intervalIdMetronome
      // );
      clearInterval(intervalIdMetronome);
    }
    console.log("line 450 home.js - intervalId  - " + intervalIdMetronome);
    if (intervalIdMetronome == null) {
      SetIsLeftButtonTurn(!localIsLeftButtonTurn);
      localIsRightButtonTurn = localIsLeftButtonTurn;
      SetisRightButtonTurn(localIsRightButtonTurn);
      localIsLeftButtonTurn = !localIsLeftButtonTurn;
    }

    if (intervalId != null) {
      // console.log(
      //   "home .js line 397 - interval id of metronome is --- " +
      //     intervalIdMetronome
      // );
      // console.log(
      //   "home.js line 398 - the interval Id to clear is --- " + intervalId
      // );
      clearInterval(intervalId);
    }

    //when practice type is notes
    if (practiceType === PracticeType[0]) {
      globalcount++;
      if (globalcount >= 1000) {
        globalcount = 1;
      }
      const theNote = chordToDisplayNonRepeatingList[globalcount];
      if (theNote.includes("#")) {
        // console.log("Home.js line 390 - theNote is -- " + theNote);
        SetRootNoteToDisplay(theNote[0]);
        SetSharp("#");
      } else {
        // console.log("Home.js line 390 - theNote is -- " + theNote);
        SetRootNoteToDisplay(theNote);
        SetSharp("");
      }

      intervalId = setInterval(SetDisplayNote, 120000 / tempoLocal);
      intervalIdMetronome = setInterval(SetMetronomeClicks, 60000 / tempoLocal);
      var num = theScaleNotes.indexOf(theNote);

      // SetChordValue(
      //   chordsToDisplayAccordingToSelected[num][
      //     Math.floor(
      //       Math.random() * chordsToDisplayAccordingToSelected[num].length
      //     )
      //   ]
      // );

      // setTimeout(() => {
      //   if (isRunning) {
      //     SetIsLeftButtonTurn(!localIsLeftButtonTurn);
      //     localIsRightButtonTurn = localIsLeftButtonTurn;
      //     SetisRightButtonTurn(localIsRightButtonTurn);
      //     localIsLeftButtonTurn = !localIsLeftButtonTurn;
      //   } else {
      //     SetIsLeftButtonTurn(false);
      //     SetisRightButtonTurn(false);
      //     localIsLeftButtonTurn = false;
      //     localIsRightButtonTurn = false;
      //   }
      // }, 60000 / tempo);
      times.push(Date.now());

      //check to recall
      // if (val === prevNote) {
      //   SetIsLeftButtonTurn(!localIsLeftButtonTurn);
      //   localIsRightButtonTurn = localIsLeftButtonTurn;
      //   SetisRightButtonTurn(localIsRightButtonTurn);
      //   localIsLeftButtonTurn = !localIsLeftButtonTurn;
      //   SetDisplayNote();
      // } else {
      //   if (val.includes("#")) {
      //     SetRootNoteToDisplay(val[0]);
      //     SetSharp("#");
      //   } else {
      //     SetRootNoteToDisplay(val);
      //     SetSharp("");
      //   }
      //   setTimeout(() => {
      //     SetIsLeftButtonTurn(!localIsLeftButtonTurn);
      //     localIsRightButtonTurn = localIsLeftButtonTurn;
      //     SetisRightButtonTurn(localIsRightButtonTurn);
      //     localIsLeftButtonTurn = !localIsLeftButtonTurn;
      //   }, 60000 / tempo);
      //   prevNote = val;
      //   // SetIsLeftButtonTurn(!localIsLeftButtonTurn);
      //   // localIsRightButtonTurn = localIsLeftButtonTurn;
      //   // SetisRightButtonTurn(localIsRightButtonTurn);
      //   // localIsLeftButtonTurn = !localIsLeftButtonTurn;
      //   times.push(Date.now());
      // }
    }
    // when practice type is chords
    else if (practiceType === PracticeType[1]) {
      globalcount++;
      if (globalcount >= 1000) {
        globalcount = 1;
      }
      const theNote = chordToDisplayNonRepeatingList[globalcount];
      if (theNote.includes("#")) {
        // console.log("Home.js line 390 - theNote is -- " + theNote);
        SetRootNoteToDisplay(theNote[0]);
        SetSharp("#");
      } else {
        // console.log("Home.js line 390 - theNote is -- " + theNote);
        SetRootNoteToDisplay(theNote);
        SetSharp("");
      }

      var num = theScaleNotes.indexOf(theNote);

      SetChordValue(
        chordsToDisplayAccordingToSelected[num][
          Math.floor(
            Math.random() * chordsToDisplayAccordingToSelected[num].length
          )
        ]
      );

      intervalId = setInterval(SetDisplayNote, 120000 / tempoLocal);
      intervalIdMetronome = setInterval(SetMetronomeClicks, 60000 / tempoLocal);
      // setTimeout(() => {
      //   if (isRunning) {
      //     SetIsLeftButtonTurn(!localIsLeftButtonTurn);
      //     localIsRightButtonTurn = localIsLeftButtonTurn;
      //     SetisRightButtonTurn(localIsRightButtonTurn);
      //     localIsLeftButtonTurn = !localIsLeftButtonTurn;
      //   } else {
      //     SetIsLeftButtonTurn(false);
      //     SetisRightButtonTurn(false);
      //     localIsLeftButtonTurn = false;
      //     localIsRightButtonTurn = false;
      //   }
      // }, 60000 / tempo);

      times.push(Date.now());

      
      // if (num === prevNum) {
      //   console.log("recalling...");
      //   SetIsLeftButtonTurn(!localIsLeftButtonTurn);
      //   localIsRightButtonTurn = localIsLeftButtonTurn;
      //   SetisRightButtonTurn(localIsRightButtonTurn);
      //   localIsLeftButtonTurn = !localIsLeftButtonTurn;
      //   SetDisplayNote();
      // }
      // chordsToDisplayAccordingToSelected.forEach((item) => {
      //   item = [];
      // });

      // SetChordValue(
      //   chordsToDisplayAccordingToSelected[num][
      //     Math.floor(
      //       Math.random() * chordsToDisplayAccordingToSelected[num].length
      //     )
      //   ]
      // );
      // const theNote = theScaleNotes[num];
      // if (theNote.includes("#")) {
      //   SetRootNoteToDisplay(theNote[0]);
      //   SetSharp("#");
      // } else {
      //   SetRootNoteToDisplay(theNote);
      //   SetSharp("");
      // }
      // // console.log("prev no is - " + prevNum);
      // // console.log("num is - " + num);
    }
  };

  const SetMetronomeClicks = () => {
    if (isRunning) {
      if (intervalIdMetronome != null) {
        clearInterval(intervalIdMetronome);
      }
      if (!localIsLeftButtonTurn) {
        //when practice type is notes
        if (practiceType === PracticeType[0]) {
          globalcount++;
          if (globalcount >= 1000) {
            globalcount = 1;
          }
          const theNote = chordToDisplayNonRepeatingList[globalcount];
          if (theNote.includes("#")) {
            // console.log("Home.js line 390 - theNote is -- " + theNote);
            SetRootNoteToDisplay(theNote[0]);
            SetSharp("#");
          } else {
            // console.log("Home.js line 390 - theNote is -- " + theNote);
            SetRootNoteToDisplay(theNote);
            SetSharp("");
          }

          var num = theScaleNotes.indexOf(theNote);

          // SetChordValue(
          //   chordsToDisplayAccordingToSelected[num][
          //     Math.floor(
          //       Math.random() * chordsToDisplayAccordingToSelected[num].length
          //     )
          //   ]
          // );

          // setTimeout(() => {
          //   if (isRunning) {
          //     SetIsLeftButtonTurn(!localIsLeftButtonTurn);
          //     localIsRightButtonTurn = localIsLeftButtonTurn;
          //     SetisRightButtonTurn(localIsRightButtonTurn);
          //     localIsLeftButtonTurn = !localIsLeftButtonTurn;
          //   } else {
          //     SetIsLeftButtonTurn(false);
          //     SetisRightButtonTurn(false);
          //     localIsLeftButtonTurn = false;
          //     localIsRightButtonTurn = false;
          //   }
          // }, 60000 / tempo);
          times.push(Date.now());

          //check to recall
          // if (val === prevNote) {
          //   SetIsLeftButtonTurn(!localIsLeftButtonTurn);
          //   localIsRightButtonTurn = localIsLeftButtonTurn;
          //   SetisRightButtonTurn(localIsRightButtonTurn);
          //   localIsLeftButtonTurn = !localIsLeftButtonTurn;
          //   SetDisplayNote();
          // } else {
          //   if (val.includes("#")) {
          //     SetRootNoteToDisplay(val[0]);
          //     SetSharp("#");
          //   } else {
          //     SetRootNoteToDisplay(val);
          //     SetSharp("");
          //   }
          //   setTimeout(() => {
          //     SetIsLeftButtonTurn(!localIsLeftButtonTurn);
          //     localIsRightButtonTurn = localIsLeftButtonTurn;
          //     SetisRightButtonTurn(localIsRightButtonTurn);
          //     localIsLeftButtonTurn = !localIsLeftButtonTurn;
          //   }, 60000 / tempo);
          //   prevNote = val;
          //   // SetIsLeftButtonTurn(!localIsLeftButtonTurn);
          //   // localIsRightButtonTurn = localIsLeftButtonTurn;
          //   // SetisRightButtonTurn(localIsRightButtonTurn);
          //   // localIsLeftButtonTurn = !localIsLeftButtonTurn;
          //   times.push(Date.now());
          // }
        }
        // when practice type is chords
        else if (practiceType === PracticeType[1]) {
          globalcount++;
          if (globalcount >= 1000) {
            globalcount = 1;
          }
          const theNote = chordToDisplayNonRepeatingList[globalcount];
          if (theNote.includes("#")) {
            // console.log("Home.js line 390 - theNote is -- " + theNote);
            SetRootNoteToDisplay(theNote[0]);
            SetSharp("#");
          } else {
            // console.log("Home.js line 390 - theNote is -- " + theNote);
            SetRootNoteToDisplay(theNote);
            SetSharp("");
          }

          var num = theScaleNotes.indexOf(theNote);

          SetChordValue(
            chordsToDisplayAccordingToSelected[num][
              Math.floor(
                Math.random() * chordsToDisplayAccordingToSelected[num].length
              )
            ]
          );

          // setTimeout(() => {
          //   if (isRunning) {
          //     SetIsLeftButtonTurn(!localIsLeftButtonTurn);
          //     localIsRightButtonTurn = localIsLeftButtonTurn;
          //     SetisRightButtonTurn(localIsRightButtonTurn);
          //     localIsLeftButtonTurn = !localIsLeftButtonTurn;
          //   } else {
          //     SetIsLeftButtonTurn(false);
          //     SetisRightButtonTurn(false);
          //     localIsLeftButtonTurn = false;
          //     localIsRightButtonTurn = false;
          //   }
          // }, 60000 / tempo);
          times.push(Date.now());
          // if (num === prevNum) {
          //   console.log("recalling...");
          //   SetIsLeftButtonTurn(!localIsLeftButtonTurn);
          //   localIsRightButtonTurn = localIsLeftButtonTurn;
          //   SetisRightButtonTurn(localIsRightButtonTurn);
          //   localIsLeftButtonTurn = !localIsLeftButtonTurn;
          //   SetDisplayNote();
          // }
          // chordsToDisplayAccordingToSelected.forEach((item) => {
          //   item = [];
          // });

          // SetChordValue(
          //   chordsToDisplayAccordingToSelected[num][
          //     Math.floor(
          //       Math.random() * chordsToDisplayAccordingToSelected[num].length
          //     )
          //   ]
          // );
          // const theNote = theScaleNotes[num];
          // if (theNote.includes("#")) {
          //   SetRootNoteToDisplay(theNote[0]);
          //   SetSharp("#");
          // } else {
          //   SetRootNoteToDisplay(theNote);
          //   SetSharp("");
          // }
          // // console.log("prev no is - " + prevNum);
          // // console.log("num is - " + num);
        }
      }

      intervalIdMetronome = setInterval(SetMetronomeClicks, 60000 / tempoLocal);
      SetIsLeftButtonTurn(!localIsLeftButtonTurn);
      localIsRightButtonTurn = localIsLeftButtonTurn;
      SetisRightButtonTurn(localIsRightButtonTurn);
      localIsLeftButtonTurn = !localIsLeftButtonTurn;
    } else {
      SetIsLeftButtonTurn(false);
      SetisRightButtonTurn(false);
      localIsLeftButtonTurn = false;
      localIsRightButtonTurn = false;
    }
  };

  const SetLookOrPlay = () => {
    SetIsLeftButtonTurn(!localIsLeftButtonTurn);
    localIsRightButtonTurn = localIsLeftButtonTurn;
    SetisRightButtonTurn(localIsRightButtonTurn);
    localIsLeftButtonTurn = !localIsLeftButtonTurn;
  };

  const onMinusFivePressed = () => {
    if (tempoLocal > 14) {
      tempoLocal = tempoLocal - 5;
      SetTempo(tempoLocal);
      // SetNote(scaleNotes[Math.floor(Math.random() * scaleNotes.length)]);
      // clearInterval(intervalId);
      // if (buttonTitle === "Stop")
      //   intervalId = setInterval(SetDisplayNote, 120000 / tempo);
    } else {
      Alert.alert("Caution!", "Can't set tempo below 10");
    }
  };
  const onMinusOnePressed = () => {
    if (tempoLocal > 10) {
      tempoLocal = tempoLocal - 1;
      SetTempo(tempoLocal);
      // SetNote(scaleNotes[Math.floor(Math.random() * scaleNotes.length)]);
      clearInterval(intervalId);
      if (buttonTitle === "Stop")
        intervalId = setInterval(SetDisplayNote, 120000 / tempo);
    } else {
      Alert.alert("Caution!", "Can't set tempo below 10");
    }
  };
  const onPlusFivePressed = () => {
    if (tempoLocal < 196) {
      tempoLocal = tempoLocal + 5;
      SetTempo(tempoLocal);
      // SetNote(scaleNotes[Math.floor(Math.random() * scaleNotes.length)]);
      // clearInterval(intervalId);
      // if (buttonTitle === "Stop")
      //   intervalId = setInterval(SetDisplayNote, 120000 / tempo);
    } else {
      Alert.alert("Caution!", "Can't set tempo above 200");
    }
  };
  const onPlusOnePressed = () => {
    if (tempoLocal < 200) {
      tempoLocal = tempoLocal + 1;
      SetTempo(tempoLocal);
      // SetNote(scaleNotes[Math.floor(Math.random() * scaleNotes.length)]);
      clearInterval(intervalId);
      if (buttonTitle === "Stop")
        intervalId = setInterval(SetDisplayNote, 120000 / tempo);
    } else {
      Alert.alert("Caution!", "Can't set tempo above 200");
    }
  };

  useEffect(() => {
    const eeventSubscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );

    if (buttonTitle === "Start" && RootNotesetFromSetting === true) {
      // console.log(
      //   "Home.js line 260 - inside useeffect button title - " + buttonTitle
      // );
      let val = "";
      if (practiceType === PracticeType[1]) {
        for (let i = 0; i < chordTypes.length; i++) {
          const element = chordTypes[i];
          if (element == ChordTypes[0]) {
            val = theScaleNotes[0];
            SetChordValue(ChordTypes[0]);
            break;
            // theScaleDegreesBasedOnSelectedChords.push(0);
            // theScaleDegreesBasedOnSelectedChords.push(3);
            // theScaleDegreesBasedOnSelectedChords.push(4);
          } else if (element == ChordTypes[1]) {
            // theScaleDegreesBasedOnSelectedChords.push(1);
            // theScaleDegreesBasedOnSelectedChords.push(2);
            // theScaleDegreesBasedOnSelectedChords.push(5);
            val = theScaleNotes[1];
            SetChordValue(ChordTypes[1]);
            break;
          } else if (element == ChordTypes[2]) {
            // chordsToDisplayAccordingToSelected[6].push(item);
            // theScaleDegreesBasedOnSelectedChords.push(6);
            val = theScaleNotes[6];
            SetChordValue(ChordTypes[2]);
            break;
          } else if (element == ChordTypes[3]) {
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(0) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(0);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(3) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(3);
            val = theScaleNotes[0];
            SetChordValue(ChordTypes[3]);
            break;
          } else if (element == ChordTypes[4]) {
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(1) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(1);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(2) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(2);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(5) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(5);
            val = theScaleNotes[2];
            SetChordValue(ChordTypes[4]);
            break;
          } else if (element == ChordTypes[5]) {
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(4) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(4);
            val = theScaleNotes[4];
            SetChordValue(ChordTypes[5]);
            break;
          } else if (element == ChordTypes[6]) {
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(0) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(0);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(1) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(1);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(3) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(3);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(4) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(4);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(5) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(5);
            val = theScaleNotes[0];
            SetChordValue(ChordTypes[6]);
            break;
          } else if (element == ChordTypes[7]) {
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(0) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(0);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(1) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(1);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(2) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(2);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(4) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(4);
            // if (theScaleDegreesBasedOnSelectedChords.indexOf(5) == -1)
            //   theScaleDegreesBasedOnSelectedChords.push(5);
            val = theScaleNotes[0];
            SetChordValue(ChordTypes[7]);
            break;
          }
        }

        // val = rootNote;
        // SetRootNoteToDisplay(rootNote);
        // indexForChord = theScaleNotes.indexOf(val);
        // SetChordValue(ChordInAScale[indexForChord][0]);
        if (val.includes("#")) {
          SetRootNoteToDisplay(val[0]);
          // rootNoteToDisplay = val[0];
          SetSharp("#");
          // sharpValue = "#";
        } else {
          SetRootNoteToDisplay(val);
          // rootNoteToDisplay = val;
          SetSharp("");
          // sharpValue = "";
        }

        if (chordTypes.length == 0) {
          SetRootNoteToDisplay("-");
        }
      } else if (practiceType === PracticeType[0]) {
        val = rootNoteForNoteMode;
        SetRootNoteToDisplay(val);
        if (val.includes("#")) {
          SetRootNoteToDisplay(val[0]);
          // rootNoteToDisplay = val[0];
          SetSharp("#");
          // sharpValue = "#";
        } else {
          SetRootNoteToDisplay(val);
          // rootNoteToDisplay = val;
          SetSharp("");
          // sharpValue = "";
        }
      }
    }
    if (buttonTitle === "Start" && practiceType == PracticeType[0]) {
      SetChordValue("");
    }
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      // eeventSubscription?.remove();
    };
  });

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // console.log("App in foreground !");
    }

    if (nextAppState === "inactive" || nextAppState === "background") {
      isRunning = false;
      dispatch(saveRootNoteSetFromSetting(false));
      SetButtonTitle("Start");

      clearInterval(intervalId);
      clearInterval(intervalIdMetronome);
      intervalId = null;

      SetIsLeftButtonTurn(false);
      SetisRightButtonTurn(false);
      localIsLeftButtonTurn = false;
      localIsRightButtonTurn = false;

      chordsToDisplayAccordingToSelected = [[], [], [], [], [], [], []];
      theScaleDegreesBasedOnSelectedChords = [];
      chordToDisplayNonRepeatingList = [];

      for (let index = 0; index < times.length - 1; index++) {
        const element = times[index + 1] - times[index];
        console.log(element);
      }
      times = [];
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // console.log("Appstate : ", nextAppState);
  };
  useFocusEffect(
    React.useCallback(() => {
      // alert("Screen was focused");
      // Do something when the screen is focused
      return () => {
        // alert("Screen was unfocused");
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        isRunning = false;
        dispatch(saveRootNoteSetFromSetting(false));
        SetButtonTitle("Start");

        clearInterval(intervalId);
        clearInterval(intervalIdMetronome);
        intervalId = null;

        SetIsLeftButtonTurn(false);
        SetisRightButtonTurn(false);
        localIsLeftButtonTurn = false;
        localIsRightButtonTurn = false;

        chordsToDisplayAccordingToSelected = [[], [], [], [], [], [], []];
        theScaleDegreesBasedOnSelectedChords = [];
        chordToDisplayNonRepeatingList = [];

        for (let index = 0; index < times.length - 1; index++) {
          const element = times[index + 1] - times[index];
          console.log(element);
        }
        times = [];
      };
    }, [])
  );

  if (platform === "ios") {
    if (practiceType === PracticeType[0]) {
      return (
        <ScrollView>
          <View
            style={{
              backgroundColor: colorsForTheApp.backgroundColor,
              minHeight: windowHeightLocal,
            }}
          >
            {/* Description View */}
            <View style={styles.descriptionViewStyleIOS}>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "90%",
                  paddingTop: 10,
                }}
              >
                <View>
                  <CustomText>
                    Pratice Type : <Text>{practiceType}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Scale : <Text>{scaleTypeForDescription}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Root Note : <Text>{rootNoteForDescription}</Text>
                  </CustomText>
                </View>
              </View>
            </View>

            {/* Chord Display and Tempo View */}
            <View style={styles.theNoteAndTempocontainerIOS}>
              {/* Chord Display -  1st half */}
              <View
                style={{
                  minWidth: 180,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // borderColor: "red",
                  // borderWidth: 1,
                  flex: 0.5,
                  shadowColor: colorsForTheApp.textColor,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 5,
                  backgroundColor: "white",
                  borderRadius: 8,
                  width: "90%",
                  marginVertical: 10,
                  paddingBottom: 10,
                  backgroundColor: colorsForTheApp.backgroundColor,
                }}
              >
                {/* The Note Row */}
                <View style={{ flexDirection: "row", width: "100%" }}>
                  {/* Empty View on Left */}
                  <View
                    style={{
                      flex: 1,
                      // borderColor: "red",
                      // borderWidth: 1
                    }}
                  ></View>

                  {/* The Note */}
                  <View
                    style={{
                      // borderColor: "red",
                      // borderWidth: 1
                      lex: windowWidthLocal > 500 ? 1 : 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CustomText style={styles.noteStyle}>
                      {rootNoteToDisplay}
                    </CustomText>
                  </View>

                  {/* The Sharp and Maj/Min View */}
                  <View
                    style={{
                      flexDirection: "column",
                      flex: 1,
                      // borderColor: "red",
                      // borderWidth: 1,
                    }}
                  >
                    <View style={styles.sharpViewStyle}>
                      <CustomText style={styles.sharpTextStyle}>
                        {sharp}
                      </CustomText>
                    </View>

                    <View style={{ flex: 1 }}></View>

                    <View
                      style={{
                        flexDirection: "column-reverse",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <CustomText style={styles.MajMinTextStyleIOS}>
                        {chordValue}
                      </CustomText>
                    </View>
                  </View>
                </View>

                {/* Look and Play */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "32%",
                    // borderWidth: 1,
                    // borderColor: "red",
                    position: "relative",
                    top: -30,
                  }}
                >
                  {/* Look */}
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    {/* Left RadioButton */}
                    <View
                      style={{
                        // position: "absolute",
                        // left: windowWidthLocal < 330 ? 90 : 105,
                        // top: 275,
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        borderColor: isLeftButtonTurn
                          ? colorsForTheApp.primaryColor
                          : colors.secondary_text,
                        borderWidth: 2,
                        padding: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isLeftButtonTurn
                            ? colorsForTheApp.primaryColor
                            : colors.secondary_text,
                          width: 17,
                          height: 17,
                          borderRadius: 17,
                        }}
                      ></View>
                    </View>

                    {/* Look */}
                    <View
                      style={{
                        // position: "absolute",
                        // left: windowWidthLocal < 330 ? 90 : 105,
                        // top: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomText style={{ fontSize: 13 }}>Look</CustomText>
                    </View>
                  </View>

                  {/* Play */}
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-end",
                      flex: 1,
                    }}
                  >
                    {/* Right RadioButton */}
                    <View
                      style={{
                        // position: "absolute",
                        // right: windowWidthLocal < 330 ? 90 : 105,
                        // top: 275,
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        borderColor: isRightButtonTurn
                          ? colorsForTheApp.primaryColor
                          : colors.secondary_text,
                        borderWidth: 2,
                        padding: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isRightButtonTurn
                            ? colorsForTheApp.primaryColor
                            : colors.secondary_text,
                          width: 17,
                          height: 17,
                          borderRadius: 17,
                        }}
                      ></View>
                    </View>

                    {/* Play */}
                    <View
                      style={{
                        // position: "absolute",
                        // right: windowWidthLocal < 330 ? 90 : 105,
                        // top: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomText style={{ fontSize: 13 }}>Play</CustomText>
                    </View>
                  </View>
                </View>

                {/* Start Button */}
                <View style={{ paddingTop: 10 }}>
                  <ReactButton title={buttonTitle} onPress={onStartPress} />
                </View>
              </View>

              {/*Tempo View 2nd Half */}
              <View
                style={{
                  width: windowWidthLocal,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flex: 0.5,
                  paddingBottom: 10,
                  paddingTop: 10,
                  backgroundColor: colorsForTheApp.backgroundColor,
                  // borderColor: "red",
                  // borderWidth: 1,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 30,
                    shadowColor: colorsForTheApp.textColor,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    shadowRadius: 5,
                    backgroundColor: "white",
                    borderRadius: 8,
                    width: "90%",
                    backgroundColor: colorsForTheApp.backgroundColor,
                  }}
                >
                  {/* Tempo Text */}
                  <View style={{ paddingTop: 10 }}>
                    <CustomText style={styles.TempoTextStyle}>Tempo</CustomText>
                  </View>

                  {/* Tempo Manager */}
                  <View style={styles.TempoManagerStyle}>
                    <View>
                      <View style={{ paddingBottom: 10, paddingRight: 20 }}>
                        <ReactButton title="-5" onPress={onMinusFivePressed}>
                          -5
                        </ReactButton>
                      </View>
                      <View style={{ paddingTop: 10, paddingRight: 20 }}>
                        <ReactButton
                          title="-1"
                          onPress={onMinusOnePressed}
                        ></ReactButton>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 38,
                      }}
                    >
                      <CustomText style={styles.tempoValueStyle}>
                        {tempo}
                      </CustomText>
                    </View>
                    <View>
                      <View style={{ paddingBottom: 10, paddingLeft: 20 }}>
                        <ReactButton
                          title="+5"
                          onPress={onPlusFivePressed}
                        ></ReactButton>
                      </View>
                      <View style={{ paddingTop: 10, paddingLeft: 20 }}>
                        <ReactButton
                          title="+1"
                          onPress={onPlusOnePressed}
                        ></ReactButton>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View
            style={{
              backgroundColor: colorsForTheApp.backgroundColor,
              minHeight: windowHeightLocal,
            }}
          >
            {/* Description View */}
            <View style={styles.descriptionViewStyleIOS}>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "90%",
                  paddingTop: 10,
                }}
              >
                <View>
                  <CustomText>
                    Pratice Type : <Text>{practiceType}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Scale : <Text>{scaleTypeForDescription}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Chords : <Text>{chordsListInString}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Root Note : <Text>{rootNoteForDescription}</Text>
                  </CustomText>
                </View>
              </View>
            </View>

            {/* Chord Display and Tempo View */}
            <View style={styles.theNoteAndTempocontainerIOS}>
              {/* Chord Display -  1st half */}
              <View
                style={{
                  minWidth: 180,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // borderColor: "white",
                  // borderWidth: 0.17,
                  flex: 0.5,
                  shadowColor: colorsForTheApp.textColor,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 5,
                  borderRadius: 8,
                  width: "90%",
                  marginVertical: 10,
                  paddingBottom: 10,
                  backgroundColor: colorsForTheApp.backgroundColor,
                }}
              >
                {/* the Note Row */}
                <View style={{ flexDirection: "row", width: "100%" }}>
                  {/* Empty View on Left */}
                  <View
                    style={{
                      flex: 1,
                      // borderColor: "red",
                      // borderWidth: 1
                    }}
                  ></View>

                  {/* The Note */}
                  <View
                    style={{
                      // borderColor: "red",
                      // borderWidth: 1
                      flex: windowWidthLocal > 500 ? 1 : 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CustomText style={styles.noteStyle}>
                      {rootNoteToDisplay}
                    </CustomText>
                  </View>

                  {/* The Sharp and Maj/Min View */}
                  <View
                    style={{
                      flexDirection: "column",
                      flex: 1,
                      // borderColor: "red",
                      // borderWidth: 1,
                    }}
                  >
                    <View style={styles.sharpViewStyle}>
                      <CustomText style={styles.sharpTextStyle}>
                        {sharp}
                      </CustomText>
                    </View>

                    <View style={{ flex: 1 }}></View>

                    <View
                      style={{
                        flexDirection: "column-reverse",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <CustomText style={styles.MajMinTextStyleIOS}>
                        {chordValue}
                      </CustomText>
                    </View>
                  </View>
                </View>

                {/* Look and Play */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "32%",
                    // borderWidth: 1,
                    // borderColor: "red",
                    position: "relative",
                    top: -30,
                  }}
                >
                  {/* Look */}
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    {/* Left RadioButton */}
                    <View
                      style={{
                        // position: "absolute",
                        // left: windowWidthLocal < 330 ? 90 : 105,
                        // top: 275,
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        borderColor: isLeftButtonTurn
                          ? colorsForTheApp.primaryColor
                          : colors.secondary_text,
                        borderWidth: 2,
                        padding: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isLeftButtonTurn
                            ? colorsForTheApp.primaryColor
                            : colors.secondary_text,
                          width: 17,
                          height: 17,
                          borderRadius: 17,
                        }}
                      ></View>
                    </View>

                    {/* Look */}
                    <View
                      style={{
                        // position: "absolute",
                        // left: windowWidthLocal < 330 ? 90 : 105,
                        // top: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomText style={{ fontSize: 13 }}>Look</CustomText>
                    </View>
                  </View>

                  {/* Play */}
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-end",
                      flex: 1,
                    }}
                  >
                    {/* Right RadioButton */}
                    <View
                      style={{
                        // position: "absolute",
                        // right: windowWidthLocal < 330 ? 90 : 105,
                        // top: 275,
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        borderColor: isRightButtonTurn
                          ? colorsForTheApp.primaryColor
                          : colors.secondary_text,
                        borderWidth: 2,
                        padding: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isRightButtonTurn
                            ? colorsForTheApp.primaryColor
                            : colors.secondary_text,
                          width: 17,
                          height: 17,
                          borderRadius: 17,
                        }}
                      ></View>
                    </View>

                    {/* Play */}
                    <View
                      style={{
                        // position: "absolute",
                        // right: windowWidthLocal < 330 ? 90 : 105,
                        // top: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomText style={{ fontSize: 13 }}>Play</CustomText>
                    </View>
                  </View>
                </View>

                {/* Start Button */}
                <View style={{ paddingTop: 10 }}>
                  <ReactButton title={buttonTitle} onPress={onStartPress} />
                </View>
              </View>

              {/*Tempo View 2nd Half */}
              <View
                style={{
                  width: windowWidthLocal,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flex: 0.5,
                  paddingBottom: 10,
                  paddingTop: 10,
                  backgroundColor: colorsForTheApp.backgroundColor,
                  // borderColor: "red",
                  // borderWidth: 1,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 30,
                    shadowColor: colorsForTheApp.textColor,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    shadowRadius: 5,
                    backgroundColor: colorsForTheApp.backgroundColor,
                    borderRadius: 8,
                    width: "90%",
                  }}
                >
                  {/* Tempo Text */}
                  <View style={{ paddingTop: 10 }}>
                    <CustomText style={styles.TempoTextStyle}>Tempo</CustomText>
                  </View>

                  {/* Tempo Manager */}
                  <View style={styles.TempoManagerStyle}>
                    <View>
                      <View style={{ paddingBottom: 10, paddingRight: 20 }}>
                        <ReactButton title="-5" onPress={onMinusFivePressed}>
                          -5
                        </ReactButton>
                      </View>
                      <View style={{ paddingTop: 10, paddingRight: 20 }}>
                        <ReactButton
                          title="-1"
                          onPress={onMinusOnePressed}
                        ></ReactButton>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 38,
                      }}
                    >
                      <CustomText style={styles.tempoValueStyle}>
                        {tempo}
                      </CustomText>
                    </View>
                    <View>
                      <View style={{ paddingBottom: 10, paddingLeft: 20 }}>
                        <ReactButton
                          title="+5"
                          onPress={onPlusFivePressed}
                        ></ReactButton>
                      </View>
                      <View style={{ paddingTop: 10, paddingLeft: 20 }}>
                        <ReactButton
                          title="+1"
                          onPress={onPlusOnePressed}
                        ></ReactButton>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* <View style={{backgroundColor:colorsForTheApp.backgroundColor, height:50,}}></View> */}
          </View>
        </ScrollView>
      );
    }
  } else if (platform === "android") {
    if (practiceType === PracticeType[0]) {
      return (
        <ScrollView>
          <View
            style={{
              backgroundColor: colorsForTheApp.backgroundColor,
              minHeight: windowHeightLocal,
            }}
          >
            {/* Description View */}
            <View style={styles.descriptionViewStyleIOS}>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "90%",
                  paddingTop: 10,
                }}
              >
                <View>
                  <CustomText>
                    Pratice Type : <Text>{practiceType}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Scale : <Text>{scaleTypeForDescription}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Root Note : <Text>{rootNoteForDescription}</Text>
                  </CustomText>
                </View>
              </View>
            </View>

            {/* Chord Display and Tempo View */}
            <View style={styles.container}>
              {/* 1st half */}
              <View
                style={{
                  minWidth: 180,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // borderColor: "red",
                  // borderWidth: 1,
                  flex: 1,
                  elevation: 10,
                  backgroundColor: colorsForTheApp.backgroundColor,
                  shadowColor: colorsForTheApp.textColor,
                  borderRadius: 20,
                  width: "90%",
                  marginTop: 10,
                }}
              >
                {/* RootNote Row */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    // height:"55%",
                    // borderWidth: 1,
                    // borderColor: "red",
                    // position: "relative",
                    // top: -50,
                  }}
                >
                  <View style={{ flex: 1 }}></View>

                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: "red"
                      flex: windowWidthLocal > 500 ? 1 : 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CustomText
                      style={{ fontSize: windowWidthLocal < 330 ? 190 : 250 }}
                    >
                      {rootNoteToDisplay}
                    </CustomText>
                  </View>

                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flex: 1,
                        // position: "absolute",
                        // top: 30,
                        // left: windowWidthLocal < 330 ? 205 : 250,
                      }}
                    >
                      <CustomText style={styles.sharpTextStyle}>
                        {sharp}
                      </CustomText>
                    </View>

                    <View></View>

                    <View
                      style={{
                        alignItems: "flex-start",
                        flexDirection: "column-reverse",
                        justifyContent: "center",
                        flex: 1,
                        // position: "absolute",
                        // top: 240,
                        // left: windowWidthLocal < 330 ? 210 : 260,
                      }}
                    >
                      <CustomText style={styles.MajMinTextStyleAndroid}>
                        {chordValue}
                      </CustomText>
                    </View>
                  </View>
                </View>

                {/* Look and Play */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "32%",
                    // borderWidth: 1,
                    // borderColor: "red",
                    position: "relative",
                    top: -40,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    {/* Left RadioButton */}
                    <View
                      style={{
                        // position: "absolute",
                        // left: windowWidthLocal < 330 ? 90 : 115,
                        // top: 275,
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        borderColor: isLeftButtonTurn
                          ? colorsForTheApp.primaryColor
                          : colors.secondary_text,
                        borderWidth: 2,
                        padding: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isLeftButtonTurn
                            ? colorsForTheApp.primaryColor
                            : colors.secondary_text,
                          width: 17,
                          height: 17,
                          borderRadius: 17,
                        }}
                      ></View>
                    </View>

                    {/* Look */}
                    <View
                      style={{
                        // position: "absolute",
                        // left: windowWidthLocal < 330 ? 90 : 112,
                        // top: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomText style={{ fontSize: 13 }}>Look</CustomText>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-end",
                      flex: 1,
                    }}
                  >
                    {/* Right RadioButton */}
                    <View
                      style={{
                        // position: "absolute",
                        // right: windowWidthLocal < 330 ? 90 : 115,
                        // top: 275,
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        borderColor: isRightButtonTurn
                          ? colorsForTheApp.primaryColor
                          : colors.secondary_text,
                        borderWidth: 2,
                        padding: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isRightButtonTurn
                            ? colorsForTheApp.primaryColor
                            : colors.secondary_text,
                          width: 17,
                          height: 17,
                          borderRadius: 17,
                        }}
                      ></View>
                    </View>

                    {/* Play */}
                    <View
                      style={{
                        // position: "absolute",
                        // right: windowWidthLocal < 330 ? 90 : 115,
                        // top: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomText style={{ fontSize: 13 }}>Play</CustomText>
                    </View>
                  </View>
                </View>

                {/* Start Button */}
                <View
                  style={{
                    paddingTop: 20,
                    // borderColor: "red",
                    // borderWidth: 1,
                    position: "relative",
                    top: -40,
                  }}
                >
                  <ReactButton title={buttonTitle} onPress={onStartPress} />
                </View>

              </View>

              {/* 2nd Half */}
              <View
                style={{
                  width: windowWidthLocal,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flex: 1,
                  // borderColor: "red",
                  // borderWidth: 1,
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    elevation: 5,
                    backgroundColor: colorsForTheApp.backgroundColor,
                    shadowColor: colorsForTheApp.textColor,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "90%",
                    marginTop: 30,
                    paddingBottom: 30,
                  }}
                >
                  {/* Tempo Text */}
                  <View>
                    <CustomText style={styles.TempoTextStyle}>Tempo</CustomText>
                  </View>

                  {/* Tempo Manager */}
                  <View style={styles.TempoManagerStyle}>
                    {/* -1 and -5 button view */}
                    <View>
                      <View style={{ paddingBottom: 10, paddingRight: 20 }}>
                        <ReactButton title="-5" onPress={onMinusFivePressed}>
                          -5
                        </ReactButton>
                      </View>
                      <View style={{ paddingTop: 10, paddingRight: 20 }}>
                        <ReactButton
                          title="-1"
                          onPress={onMinusOnePressed}
                        ></ReactButton>
                      </View>
                    </View>

                    {/* tempo value view */}
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 38,
                      }}
                    >
                      <CustomText style={styles.tempoValueStyle}>
                        {tempo}
                      </CustomText>
                    </View>

                    {/* +1 and +5 view */}
                    <View>
                      <View style={{ paddingBottom: 10, paddingLeft: 20 }}>
                        <ReactButton
                          title="+5"
                          onPress={onPlusFivePressed}
                        ></ReactButton>
                      </View>
                      <View style={{ paddingTop: 10, paddingLeft: 20 }}>
                        <ReactButton
                          title="+1"
                          onPress={onPlusOnePressed}
                        ></ReactButton>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View
            style={{
              backgroundColor: colorsForTheApp.backgroundColor,
              minHeight: windowHeightLocal,
            }}
          >
            {/* Description View */}
            <View style={styles.descriptionViewStyleIOS}>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "90%",
                  paddingTop: 10,
                }}
              >
                <View>
                  <CustomText>
                    Pratice Type : <Text>{practiceType}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Scale : <Text>{scaleTypeForDescription}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Chords : <Text>{chordsListInString}</Text>
                  </CustomText>
                </View>

                <View>
                  <CustomText>
                    Root Note : <Text>{rootNoteForDescription}</Text>
                  </CustomText>
                </View>
              </View>
            </View>

            {/* Chord Display and Tempo View */}
            <View style={styles.container}>
              {/* 1st half */}
              <View
                style={{
                  minWidth: 180,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // borderColor: "red",
                  // borderWidth: 1,
                  flex: 1,
                  elevation: 10,
                  backgroundColor: colorsForTheApp.backgroundColor,
                  shadowColor: colorsForTheApp.textColor,
                  borderRadius: 20,
                  width: "90%",
                  marginTop: 10,
                }}
              >
                {/* RootNote Row */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    // height:"55%",
                    // borderWidth: 1,
                    // borderColor: "red",
                    // position: "relative",
                    // top: -50,
                  }}
                >
                  {/* 1st column */}
                  <View style={{ flex: 1 }}></View>

                  {/* THE NOTE column */}
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: "red"
                      flex: windowWidthLocal > 500 ? 1 : 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CustomText
                      style={{ fontSize: windowWidthLocal < 330 ? 190 : 250 }}
                    >
                      {rootNoteToDisplay}
                    </CustomText>
                  </View>

                  {/* 3rd Column */}
                  <View style={{ flex: 1 }}>
                    {/* Sharp */}
                    <View
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flex: 1,
                        // position: "absolute",
                        // top: 30,
                        // left: windowWidthLocal < 330 ? 205 : 250,
                      }}
                    >
                      <CustomText style={styles.sharpTextStyle}>
                        {sharp}
                      </CustomText>
                    </View>

                    {/* empty middle view in the 3rd column */}
                    <View></View>

                    {/* maj or min */}
                    <View
                      style={{
                        alignItems: "flex-start",
                        flexDirection: "column-reverse",
                        justifyContent: "center",
                        flex: 1,
                        // position: "absolute",
                        // top: 240,
                        // left: windowWidthLocal < 330 ? 210 : 260,
                      }}
                    >
                      <CustomText style={styles.MajMinTextStyleAndroid}>
                        {chordValue}
                      </CustomText>
                    </View>
                  </View>
                </View>

                {/* Look and Play */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "32%",
                    // borderWidth: 1,
                    // borderColor: "red",
                    position: "relative",
                    top: -40,
                  }}
                >
                  {/* Look */}
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    {/* Left RadioButton */}
                    <View
                      style={{
                        // position: "absolute",
                        // left: windowWidthLocal < 330 ? 90 : 115,
                        // top: 275,
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        borderColor: isLeftButtonTurn
                          ? colorsForTheApp.primaryColor
                          : colors.secondary_text,
                        borderWidth: 2,
                        padding: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isLeftButtonTurn
                            ? colorsForTheApp.primaryColor
                            : colors.secondary_text,
                          width: 17,
                          height: 17,
                          borderRadius: 17,
                        }}
                      ></View>
                    </View>

                    {/* Look */}
                    <View
                      style={{
                        // position: "absolute",
                        // left: windowWidthLocal < 330 ? 90 : 112,
                        // top: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 13 }}>Look</Text>
                    </View>
                  </View>

                  {/* Play */}
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-end",
                      flex: 1,
                    }}
                  >
                    {/* Right RadioButton */}
                    <View
                      style={{
                        // position: "absolute",
                        // right: windowWidthLocal < 330 ? 90 : 115,
                        // top: 275,
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        borderColor: isRightButtonTurn
                          ? colorsForTheApp.primaryColor
                          : colors.secondary_text,
                        borderWidth: 2,
                        padding: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isRightButtonTurn
                            ? colorsForTheApp.primaryColor
                            : colors.secondary_text,
                          width: 17,
                          height: 17,
                          borderRadius: 17,
                        }}
                      ></View>
                    </View>

                    {/* Play */}
                    <View
                      style={{
                        // position: "absolute",
                        // right: windowWidthLocal < 330 ? 90 : 115,
                        // top: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 13 }}>Play</Text>
                    </View>
                  </View>
                </View>

                {/* Start Button */}
                <View
                  style={{
                    paddingTop: 20,
                    // borderColor: "red",
                    // borderWidth: 1,
                    position: "relative",
                    top: -40,
                  }}
                >
                  <ReactButton title={buttonTitle} onPress={onStartPress} />
                </View>
              </View>

              {/* 2nd Half */}
              <View
                style={{
                  width: windowWidthLocal,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flex: 1,
                  // borderColor: "red",
                  // borderWidth: 1,
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    elevation: 5,
                    backgroundColor: colorsForTheApp.backgroundColor,
                    shadowColor: colorsForTheApp.textColor,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "90%",
                    marginTop: 30,
                    paddingBottom: 30,
                  }}
                >
                  {/* Tempo Text */}
                  <View>
                    <CustomText style={styles.TempoTextStyle}>Tempo</CustomText>
                  </View>

                  {/* Tempo Manager */}
                  <View style={styles.TempoManagerStyle}>
                    {/* -1 and -5 button view */}
                    <View>
                      <View style={{ paddingBottom: 10, paddingRight: 20 }}>
                        <ReactButton title="-5" onPress={onMinusFivePressed}>
                          -5
                        </ReactButton>
                      </View>
                      <View style={{ paddingTop: 10, paddingRight: 20 }}>
                        <ReactButton
                          title="-1"
                          onPress={onMinusOnePressed}
                        ></ReactButton>
                      </View>
                    </View>

                    {/* tempo value view */}
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 38,
                      }}
                    >
                      <CustomText style={styles.tempoValueStyle}>
                        {tempo}
                      </CustomText>
                    </View>

                    {/* +1 and +5 view */}
                    <View>
                      <View style={{ paddingBottom: 10, paddingLeft: 20 }}>
                        <ReactButton
                          title="+5"
                          onPress={onPlusFivePressed}
                        ></ReactButton>
                      </View>
                      <View style={{ paddingTop: 10, paddingLeft: 20 }}>
                        <ReactButton
                          title="+1"
                          onPress={onPlusOnePressed}
                        ></ReactButton>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  theNoteAndTempocontainerIOS: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // shadowColor: "#171717",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // backgroundColor: "white",
    // borderRadius: 8,
  },

  descriptionViewStyleIOS: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  noteStyle: {
    fontSize: windowHeightLocal < 350 ? 150 : 250,
  },
  firstHalfScreen: {
    minWidth: 180,
    justifyContent: "flex-start",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
    flex: 1,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "grey",
    borderRadius: 20,
    width: "90%",
    marginTop: 10,
  },
  thirdHalf: {},

  leftRadioButtonPositioning: {
    position: "absolute",
    left: 25,
    top: 275,
    borderColor: "red",
    borderWidth: 1,
  },
  rightRadioButtonPositioning: {},
  sharpViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    // position: "absolute",
    // top: 30,
    // left: 160,
  },
  sharpTextStyle: {
    fontSize: 60,
  },
  MajMinViewStyleIOS: {
    position: "absolute",
    top: 210,
    left: 170,
  },
  MajMinViewStyleAndroid: {
    position: "absolute",
    top: 240,
    left: windowWidthLocal < 330 ? 200 : 250,
  },
  MajMinTextStyleIOS: {
    fontSize: 30,
  },
  MajMinTextStyleAndroid: {
    fontSize: 28,
  },
  NoteViewStyle: {
    // borderColor: "red",
    // borderWidth: 1,
  },
  TempoTextStyle: {
    fontSize: 30,
  },
  TempoManagerStyle: {
    flexDirection: "row",
    paddingTop: 2,
  },
  radioButtonStyle: {
    width: 40,
    height: 40,
  },
  tempoValueStyle: {
    fontSize: 20,
  },
});

export default HomeScreen;
