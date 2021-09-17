import { all } from 'redux-saga/effects'

import roverSaga from './models/rover/saga'
import filterSaga from './models/filter/saga'

function* rootSaga() {
    yield(all([
        roverSaga(),
        filterSaga()
    ]))   
}

export default rootSaga