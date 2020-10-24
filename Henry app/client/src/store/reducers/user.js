import { UserActionTypes } from '../actions/user';

//ESTE REDUCER ES UNA PRUEBA DE REDUX
const initialState = {
    user: ''
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case UserActionTypes.PUT_USER:
            return {
                ...state,
                user: action.payload
            }
        case UserActionTypes.LOG_OUT:
            return{
                ...state,
                user: ''
            }
        case UserActionTypes.RE_PASS:
            return{
                ...state,
                user: ''
            }
            case UserActionTypes.DROP_USER:
                return {
                    ...state
                }
        default:
            return state
    }
}