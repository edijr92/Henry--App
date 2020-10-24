import { NotasActionTypes } from '../actions/notas';

const initialState = {
    notas: []
}


export const notasReducer = (state = initialState, action) => {
    switch (action.type) {
        case NotasActionTypes.GET_NOTA: 
        return {
            ...state,
            notas: action.payload
        }
        case NotasActionTypes.POST_NOTA:
            return {
                ...state,
            }
        default:
            return state
    }
}