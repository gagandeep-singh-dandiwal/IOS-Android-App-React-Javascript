import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import deviceInformationReducer from './DeviceInformationSlice'
import pracitceInformationReducer from "./PracitceInfoSlice";
const store = configureStore({
    reducer: {
        deviceInformation: deviceInformationReducer,
        practiceInformation : pracitceInformationReducer
    }
});

export default store;

