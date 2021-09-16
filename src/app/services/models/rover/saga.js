import { call, put, takeEvery } from 'redux-saga/effects'

import { getManifest, get } from '../../api'
import { 
    roverRequestManifest,
    roverIsFetching,
    roverRequestManifestSuccess,
    roverRequestManifestError,
    roverRequestPhotos,
    roverRequestPhotoSuccess,
    roverRequestPhotosError
} from './slice'

function* roverRequestManifestWorker(action) {
    yield put(roverIsFetching(true))
    try {
        const manifest = yield call(getManifest, action.payload)
        yield put(roverRequestManifestSuccess(manifest))
    } catch(err) {
        console.log(err)
        yield put(roverRequestManifestError("Error al obtener el manifest"))
    }
}

function* roverRequestPhotosWorker(action) {
    yield put(roverIsFetching(true))
    try {
        const photos = yield call(get, `rovers/${action.payload.rover}/photos?sol=2890&api_key=${process.env.REACT_APP_API_KEY}&page=${action.payload.page}`)
        yield put(roverRequestPhotoSuccess(photos.photos))
    } catch(err) {
        console.log(err)
        yield put(roverRequestPhotosError("Error al obtener las fotos"))
    }
}

function* roverSaga() {
    yield takeEvery(roverRequestManifest, roverRequestManifestWorker)
    yield takeEvery(roverRequestPhotos, roverRequestPhotosWorker)
}

export default roverSaga