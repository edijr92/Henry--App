import { CohorteActionTypes } from '../actions/cohorte.js';


const initialState = {
    cohorte: {},
    cohortes: []
};

export const cohorteReducer = (state = initialState, action) => {
    switch (action.type) {
        case CohorteActionTypes.SET_COHORTE:
            return {
                ...state,
                cohorte: action.payload,
            }
        case CohorteActionTypes.GET_COHORTE: 
        return {
            ...state,
            cohortes: action.payload 
        }
        default:
            return state
    }
}