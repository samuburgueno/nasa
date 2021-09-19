import { createSlice } from '@reduxjs/toolkit'

const roverSlice = createSlice({
    name: "roverSlice",
    initialState: {
        manifest: {},
        isFetching: false,
        isFetchingPhotos: false,
        isFetchingScroll: false,
        error: false,
        message: "",
        photos: [],
        photosScroll: [],
        hasMore: true
    },
    reducers: {
        roverRequestManifest(state, action) {},
        roverIsFetching(state, action) {
            state.isFetching = action.payload
        },
        roverIsFetchingPhotos(state, action) {
            state.isFetchingPhotos = action.payload
        },
        roverIsFetchingScroll(state, action) {
            state.isFetchingScroll = action.payload
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
        roverRequestPhotoSuccess(state, action) {
            state.isFetchingPhotos = false
            state.photos = action.payload
            state.error = false
            state.message = ""
            state.hasMore = true
        },
        roverRequestPhotosError(state, action) {
            state.isFetchingPhotos = false
            state.error = true
            state.message = action.payload
        },
        roverRequestScroll(state, action) {},
        roverRequestScrollSuccess(state, action) {
            state.isFetchingScroll = false
            state.photosScroll = action.payload.photos
            state.hasMore = action.payload.hasMore
            state.error = false
            state.message = ""
        },
        roverRequestScrollError(state, action) {
            state.isFetchingScroll = false
            state.error = true
            state.message = action.payload
        }
    }
})

const { actions, reducer } = roverSlice

export const { 
    roverRequestManifest,
    roverIsFetching,
    roverRequestManifestSuccess,
    roverRequestManifestError,
    roverRequestPhotos,
    roverRequestPhotoSuccess,
    roverRequestPhotosError,
    roverIsFetchingPhotos,
    roverIsFetchingScroll,
    roverRequestScroll,
    roverRequestScrollSuccess,
    roverRequestScrollError,
} = actions

export default reducer