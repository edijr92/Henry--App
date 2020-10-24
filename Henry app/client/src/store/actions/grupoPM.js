import axios from 'axios';
import GrupoPm from '../../components/Admin/grupoPP/componentes/Pms';
export const GrupoPMActionsTypes = {
  GET_GRUPO: "GET_GRUPO",
  SET_PM: "SET_PM",
  PUT_GRUPO: "PUT_GRUPO",
  POST_PP: "POST_PP"
}
export const getGrupo = (cohorteId) => {
  return dispatch => {
    return axios.get("http://localhost:3006/grupos/cohorte/" + cohorteId)
      .then(res => dispatch({ type: GrupoPMActionsTypes.GET_GRUPO, payload: res.data }))
      .catch(err => console.log(err));
  }
}



export const setPm = (pm, cohorteId) => {
  return (dispatch) => {
    return axios.post(`http://localhost:3006/grupos/nuevo`, {
      pm,
      cohorteId
    })
      .then((pm) => {
        return dispatch({
          type: GrupoPMActionsTypes.SET_PM

        });
      }).catch(err => console.log(err))
  };
};
export const putGrupo = (values) => {
  return dispatch => {
    return axios.put("http://localhost/grupos/editar", values, { withCredentials: true })
      .then(() => dispatch({ type: GrupoPMActionsTypes.PUT_GRUPO }))
      .catch(err => console.log(err));
  }
}


export const createGrupoPp = (data) => {
  return dispatch => {
    return axios.post("http://localhost:3006/pair/random", {
      grupoId: data.grupoId,
      cohorteId: data.cohorteId
    }).then((pair) => {
      return dispatch({
        type: GrupoPMActionsTypes.POST_PP,
        payload: pair.data
      })
    }).then(res => {
      console.log(res)
    })
      .catch(err => console.log(err))
  }
}
