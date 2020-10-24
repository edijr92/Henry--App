import axios from "axios";

export const ModuloActionTypes = {
    SET_MODULO: 'SET_MODULO'
};

export const getClases = (modulo) => {
    return (dispatch) => {
        return axios.get(`http://localhost:3006/clase/${modulo}`, { withCredentials: true }).then((res) => {
            return dispatch({
                type: ModuloActionTypes.SET_MODULO,
                payload: res.data
            });
        }).catch(err => console.log(err));
    };
};

