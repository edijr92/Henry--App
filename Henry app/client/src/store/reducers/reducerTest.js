import { TestActionTypes } from '../actions/actionTest';

//ESTE REDUCER ES UNA PRUEBA DE REDUX
const initialState = {
    test: ''
};

export const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case TestActionTypes.PRUEBA_REDUX:
            return {
                ...state,
                test: action.payload,
            }
        default:
            return state
    }
}