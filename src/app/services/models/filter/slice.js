import { createSlice } from "@reduxjs/toolkit";

const filterSaga = createSlice({
    name: "filterSlice",
    initialState: {
        lastSearch: {},
        searches: [],
        error: false,
        message: ""
    },
    reducers: {
        filterRequestSearch(state, action) {},
        filterRequestSearchSuccess(state, action) {
            state.error = false
            state.message = ""
            state.lastSearch = action.payload
        },
        filterRequestSearchError(state, action) {
            state.error = true
            state.message = action.payload
        },
        filterSaveSearch(state, action) {},
        filterSaveSearchSuccess(state, action) {
            state.error = false
            state.message = ""
            state.searches = action.payload
        },
        filterSaveSearchError(state, action) {
            state.error = true
            state.message = action.payload
        }
    }
})

const { actions, reducer } = filterSaga

export const {
    filterRequestSearch,
    filterRequestSearchSuccess,
    filterRequestSearchError,
    filterSaveSearch,
    filterSaveSearchSuccess,
    filterSaveSearchError
} = actions

export default reducer