import { ppActionTypes } from '../actions/pairprogramming.js';


const initialState = {
    equipo: [],
    grupos: [],
    gruposDePm: []
};

export const pairProgramingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ppActionTypes.GET_PP:
            return {
                ...state,
                equipo: action.payload
            }
        case ppActionTypes.GET_PPS:
            return {
                ...state,
                grupos: action.payload
            }
        case ppActionTypes.GET_PP_PM:
            return {
                ...state,
                gruposDePm: action.payload
            }
        default:
            return state
    }
}