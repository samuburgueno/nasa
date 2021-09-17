import { call, put, takeEvery } from 'redux-saga/effects'

import { get } from '../../api'
import { 
    roverRequestManifest,
    roverIsFetching,
    roverIsFetchingPhotos,
    roverRequestManifestSuccess,
    roverRequestManifestError,
    roverRequestPhotos,
    roverRequestPhotoSuccess,
    roverRequestPhotosError
} from './slice'

function* roverRequestManifestWorker(action) {
    yield put(roverIsFetching(true))
    try {
        const manifest = yield call(get, {
            path: `manifests/${action.payload}`
        })
        yield put(roverRequestManifestSuccess(manifest.photo_manifest))
    } catch(err) {
        console.log(err)
        yield put(roverRequestManifestError("Error al obtener el manifest"))
    }
}

function* roverRequestPhotosWorker(action) {
    yield put(roverIsFetchingPhotos(true))
    try {
        const photos = yield call(get, {
            path: `rovers/${action.payload.rover}/photos`,
            params: action.payload.params
        })
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