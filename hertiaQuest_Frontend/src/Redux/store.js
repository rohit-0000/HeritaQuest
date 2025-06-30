import { configureStore } from "@reduxjs/toolkit";
import { slice } from "../Reducer/slice";

export const store=configureStore({
    reducer:{
        heritaQuest:slice.reducer
    }
})