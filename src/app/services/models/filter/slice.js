import { createSlice } from "@reduxjs/toolkit";

const filterSaga = createSlice({
    name: "filterSlice",
    initialState: {
        lastSearch: {},
        searches: [],
        error: false,
        message: "",
        searchFromFavorite: false
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
        },
        filterRequestSearchFavorite(state, action) {},
        filterSearchFromFavorite(state, action) {
            state.searchFromFavorite = action.payload
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
    filterSaveSearchError,
    filterRequestSearchFavorite,
    filterSearchFromFavorite
} = actions

export default reducer