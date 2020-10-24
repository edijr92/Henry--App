import { combineReducers } from "redux";
import { userReducer } from "./user"
import { cohorteReducer } from './cohorte'
import { pairProgramingReducer } from "./pairprogramming";
import { alumnosReducer } from "./alumnos";
import { clasesReducer } from './clases'
import { grupoPMReducer } from './grupoPM';
import { feedbackReducer } from './feedback'
import { notasReducer } from './notas'
export const rootReducer = combineReducers({
    user: userReducer,
    cohorte: cohorteReducer,
    pairPrograming: pairProgramingReducer,
    alumnos: alumnosReducer,
    clases: clasesReducer,
    grupoPM: grupoPMReducer,
    feedBack: feedbackReducer,
    notas : notasReducer
});