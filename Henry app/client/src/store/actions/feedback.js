import axios from "axios";
import { feedbackReducer } from "../reducers/feedback";

export const feedbackActionTypes = {
    POST_FEEDBACK: "POST_FEEDBACK",
    //trae un feedback de un alumno
    GET_FEEDBACK: "GET_FEEDBACK",


}
//crea un feedback a un alumno, autor id es la persona que lo hace y el alumno id es a quien se lo hacen
export const postFeedback = ({ social, skill, comentario, userId, alumnoId }) => {
    return (dispatch) => {
        axios
            .post(`http://localhost:3006/feedback/nuevo`, {
                social_skills: social,
                tecnical_skills: skill,
                comentarios: comentario,
                autorId: userId,
                alumnoId: alumnoId
            })
            .then((feedback) => {
                dispatch({
                    type: feedbackActionTypes.POST_FEEDBACK,
                    payload: feedback.data
                })
            }).catch(err => console.log(err));
    };
};
//trae el feedback de un alumno
export const getFeedback = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3006/feedback/${id}`, { withCredentials: true }).then((feedback) => {
            return dispatch({
                type: feedbackActionTypes.GET_FEEDBACK,
                payload: feedback.data
            });
        }).catch(err => console.log(err));
    };
};

