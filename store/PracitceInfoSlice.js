import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import {
  AllNotes,
  NaturalNotes,
  PracticeType,
  RootNotes,
  ScaleType,
  ChordTypes,
  NotesType
} from "../model/model";

const pracitceInformationReducer = createSlice({
  name: "pracitceInformationReducer",
  initialState: {
    initialPracticeType: PracticeType[1],
    intialRootNote: RootNotes[0],
    initialTempo: 50,
    initialScale: NaturalNotes,
    practiceTypeList: PracticeType,
    scaleTypeList: ScaleType,
    rootNotesList: RootNotes,
    chordTypesList: ChordTypes,
    noteTypeList: NotesType,
    practiceType: PracticeType[1],
    scaleType: ScaleType[0],
    rootNote: RootNotes[0],
    rootNoteForNoteMode: RootNotes[0],
    noteType: NotesType[0],
    chordTypes: [ChordTypes[0], ChordTypes[1]],
    chordsListInString: "Maj,min",
    theScale: [
      NaturalNotes[0],
      NaturalNotes[1],
      NaturalNotes[2],
      NaturalNotes[3],
      NaturalNotes[4],
      NaturalNotes[5],
      NaturalNotes[6],
    ],
    rootNoteSetfromSetting: false,
    chordToDisplayNonRepeatingList: [],
  },
  reducers: {
    saveScaleType: (state, payload) => {
      // console.log(payload.payload)
      state.scaleType = payload.payload;
    },
    savePracticeType: (state, payload) => {
      // console.log(payload.payload)
      state.practiceType = payload.payload;
    },
    saveRootNote: (state, payload) => {
      state.rootNote = payload.payload;
      // console.log('slice line 43 - the saved root note is  ' + state.rootNote);
    },
    saveRootNoteForNoteMode: (state, payload) => {
      state.rootNoteForNoteMode = payload.payload;
      // console.log('slice line 43 - the saved root note is  ' + state.rootNote);
    },
    saveRootNoteSetFromSetting: (state, payload) => {
      state.rootNoteSetfromSetting = payload.payload;
      // console.log('slice line 43 - the saved root note is  ' + state.rootNote);
    },
    saveChords: (state, payload) => {
      state.chordTypes = payload.payload;
      // console.log(state.chordTypes);
    },
    saveNoteType: (state, payload) => {
      // console.log(payload.payload)
      state.noteType = payload.payload;
    },
    saveScale: (state, payload) => {
      state.theScale = [];
      state.theScale = payload.payload;
      // console.log("payload");
      // console.log(payload.payload)
      // console.log("inside slice line 58 ->theScale --");
      // console.log(state.theScale)
      // state.rootNote = payload.payload[0]
    },
    savechordsListInString: (state, payload) => {
      state.chordsListInString = payload.payload;
    }
  },
});

export const windowHeight = (state) => {
  // console.log(state);
  state.windowHeight;
};

export const {
  saveScaleType,
  savePracticeType,
  saveRootNote,
  saveChords,
  saveNoteType,
  saveScale,
  saveRootNoteSetFromSetting,
  saveChordsSelectedList,
  saveRootNoteForNoteMode,
  savechordsListInString,
} = pracitceInformationReducer.actions;

export default pracitceInformationReducer.reducer;
