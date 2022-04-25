import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Dimensions,Platform } from "react-native";

const deviceInformationReducer = createSlice({
  name: "deviceInformationReducer",
  initialState: {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    platform : Platform.OS
  },
});

export const windowHeight = (state) => {
    // console.log(state)
  state.windowHeight;
};



export default deviceInformationReducer.reducer;
