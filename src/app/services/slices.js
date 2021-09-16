import { combineReducers } from "redux";

// Importo cada uno de los reducers de la app
import roverReducer from './models/rover/slice'

// Los combino en el root.
const rootReducer = combineReducers({
    rover: roverReducer
})

export default rootReducer