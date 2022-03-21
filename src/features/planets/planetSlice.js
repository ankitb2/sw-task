import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const PLANET_URL = "https://swapi.dev/api/planets/"
const initial = []

export const fetchPlanets = createAsyncThunk(
    '',
    async (url) => {
        const response = await getPlanets();
        return response.data
    }
)

async function getPlanets() {
    return axios.get(PLANET_URL)
}

export const planetSlice = createSlice({
    name: "planetSlice",
    initialState: {
        value: initial
    },
    reducers : {
        add : (state, action) => {
            console.log("current state", state)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlanets.fulfilled, (state, action) => {
            console.log("async thunk", action.payload.results)
            state.value = [...action.payload.results]
        })
    }
})

export const { add } = planetSlice.actions

export default planetSlice.reducer