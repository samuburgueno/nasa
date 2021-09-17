import { takeEvery, put } from 'redux-saga/effects'

import { 
    filterRequestSearch,
    filterRequestSearchSuccess,
    filterRequestSearchError
} from './slice'

function* filterRequestSearchWorker(action) {
    try {
        yield put(filterRequestSearchSuccess(action.payload))
    } catch(err) {
        console.log(err)
        yield put(filterRequestSearchError("Error al guardar la búsqueda"))
    }
}

function* filterSaga() {
    yield takeEvery(filterRequestSearch, filterRequestSearchWorker)
}

export default filterSaga