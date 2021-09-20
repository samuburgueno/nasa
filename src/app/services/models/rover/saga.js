import { call, put, takeEvery } from 'redux-saga/effects'

import { get } from '../../api'
import { 
    roverRequestManifest,
    roverIsFetching,
    roverIsFetchingPhotos,
    roverRequestManifestSuccess,
    roverRequestManifestError,
    roverRequestPhotos,
    roverRequestPhotoSuccess,
    roverRequestPhotosError,
    roverIsFetchingScroll,
    roverRequestScroll,
    roverRequestScrollSuccess,
    roverRequestScrollError,
} from './slice'

function* roverRequestManifestWorker(action) {
    yield put(roverIsFetching(true))
    try {
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
    try {
        const photos = yield call(get, {
            path: `rovers/${action.payload.rover}/photos`,
            params: action.payload.params
        })
        yield put(roverRequestPhotoSuccess(photos.photos))
    } catch(err) {
        console.log(err)
        yield put(roverRequestPhotosError("Error al obtener las fotos"))
    }
}

function* roverRequestScrollWorker(action) {
    yield put(roverIsFetchingScroll(true))
    try {
        const photos = yield call(get, {
            path: `rovers/${action.payload.rover}/photos`,
            params: action.payload.params
        })
        yield put(roverRequestScrollSuccess({
            photos: photos.photos,
            hasMore: !!photos.photos.length
        }))
    } catch(err) {
        console.log(err)
        yield put(roverRequestScrollError("Error al obtener las fotos - scroll"))
    }
}

function* roverSaga() {
    yield takeEvery(roverRequestManifest, roverRequestManifestWorker)
    yield takeEvery(roverRequestPhotos, roverRequestPhotosWorker)
    yield takeEvery(roverRequestScroll, roverRequestScrollWorker)
}

export default roverSaga