import { configureStore } from "@reduxjs/toolkit";
import planetReducer from "../features/planets/planetSlice"

export default configureStore({
    reducer: {
        planets: planetReducer
    }
})