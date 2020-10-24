import { feedbackActionTypes } from '../actions/feedback';

const initialState = {
    feedback: {},
    getFeed: []
}

export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case feedbackActionTypes.POST_FEEDBACK:
            return {
                ...state,
                feedback: action.payload,
            }
        case feedbackActionTypes.GET_FEEDBACK:
            return {
                ...state,
                getFeed: action.payload
            }
        default:
            return state
    }
}