import { all } from 'redux-saga/effects'

import roverSaga from './models/rover/saga'

function* rootSaga() {
    yield(all([
        roverSaga(),
    ]))   
}

export default rootSaga