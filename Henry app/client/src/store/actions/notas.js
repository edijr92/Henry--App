import axios from "axios";

export const NotasActionTypes = {
    POST_NOTA: "POST_NOTA",
    GET_NOTA: "GET_NOTA"
}

export const getNota = () => {
    return dispatch => {
        return axios.get("http://localhost:3006/notas/alumnos", {withCredentials: true})
            .then(res => dispatch({ type: NotasActionTypes.GET_NOTA,
                    payload: res.data }))
            .catch(err => console.log(err));
    }
}

export const postNota = (data) => {
    return dispatch => {
        return axios.post("http://localhost:3006/notas/nueva", {
            nota: data.nota,
            evaluadoId: data.evaluadoId,
            modulo: data.modulo
        },{withCredentials: true}
        ).then((res) => {
            dispatch({
                type: NotasActionTypes.POST_NOTA,
            })
        }).catch(err => console.log(err))
    }
}