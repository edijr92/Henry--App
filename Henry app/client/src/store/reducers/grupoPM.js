import {
    GrupoPMActionsTypes
} from '../actions/grupoPM';
const initialState = {
    gruposPM: [],
    pm: [],
    pp: []
};
export const grupoPMReducer =  (state = initialState, action) => {
    switch(action.type){
        case GrupoPMActionsTypes.GET_GRUPO:
            return  {
                ...state,
                gruposPM: action.payload
            }
        case GrupoPMActionsTypes.SET_PM:
            return  { 
               ...state
            }
        case GrupoPMActionsTypes.PUT_GRUPO:
            return  {
                ...state
            }
            case GrupoPMActionsTypes.POST_PP:
                return {
            ...state 
        }
        default:
            return state;
    }

}
