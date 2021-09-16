import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import { persistReducer } from 'redux-persist'

import rootSaga from './sagas'
import rootReducer from './slices';
import persistConfig from './persist'

const sagaMiddleware = createSagaMiddleware();
const middlewares = [];

middlewares.push(sagaMiddleware)

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export default store