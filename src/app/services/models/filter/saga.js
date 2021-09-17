import { takeEvery, put } from 'redux-saga/effects'

import {
    filterRequestSearch,
    filterRequestSearchSuccess,
    filterRequestSearchError,
    filterSaveSearch,
    filterSaveSearchSuccess,
    filterSaveSearchError,
    filterRequestSearchFavorite,
    filterSearchFromFavorite
} from './slice'

function* filterRequestSearchWorker(action) {
    try {
        yield put(filterRequestSearchSuccess(action.payload))
    } catch(err) {
        console.log(err)
        yield put(filterRequestSearchError("Error"))
    }
}

function* filterSaveSearchWorker(action) {
    try {
        yield put(filterSaveSearchSuccess(action.payload))
    } catch(err) {
        yield put(filterSaveSearchError("Error al guardar la búsqueda"))
    }
}

function* filterRequestSearchFavoriteWorker(action) {
    yield put(filterSearchFromFavorite(action.payload))
}

function* filterSaga() {
    yield takeEvery(filterRequestSearch, filterRequestSearchWorker)
    yield takeEvery(filterSaveSearch, filterSaveSearchWorker)
    yield takeEvery(filterRequestSearchFavorite, filterRequestSearchFavoriteWorker)
}

export default filterSaga