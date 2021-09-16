import { createSlice } from '@reduxjs/toolkit'

const roverSlice = createSlice({
    name: "roverSlice",
    initialState: {
        manifest: {},
        isFetching: false,
        error: false,
        message: "",
        photos: []
    },
    reducers: {
        roverRequestManifest(state, action) {},
        roverIsFetching(state, action) {
            state.isFetching = action.payload
        },
        roverRequestManifestSuccess(state, action) {
            state.isFetching = false
            state.manifest = action.payload
            state.error = false
            state.message = ""
        },
        roverRequestManifestError(state, action) {
            state.isFetching = false
            state.error = true
            state.message = action.payload
        },
        roverRequestPhotos(state, action) {},
        roverRequestPhotoSuccess(state, action) {
            state.isFetching = false
            state.photos = action.payload
            state.error = false
            state.message = ""
        },
        roverRequestPhotosError(state, action) {
            state.isFetching = false
            state.error = true
            state.message = action.payload
        }
    }
})

const { actions, reducer } = roverSlice

export const { 
    roverRequestManifest,
    roverIsFetching,
    roverRequestManifestSuccess,
    roverRequestManifestError,
    roverRequestPhotos,
    roverRequestPhotoSuccess,
    roverRequestPhotosError
} = actions

export default reducer