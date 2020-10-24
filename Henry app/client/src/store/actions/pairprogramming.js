import axios from "axios";

export const ppActionTypes = {
    GET_PP: 'GET_PP',
    GET_PPS: 'GET_PPS',
    GET_PP_PM: 'GET_PP_PM'
}

export const getpp = () => {
    return (dispatch) => {
      axios.get(`http://localhost:3006/pair`, {withCredentials: true}).then((res) => {
        console.log("getpp", res)
       return dispatch({
          type: ppActionTypes.GET_PP,
          payload: res.data,
        });
      }).catch(err => console.log(err));
    };
  };
export const getPps = () => {
  return dispatch => {
    return axios.get("http://localhost:3006/pair/grupos", { withCredentials: true })
      .then((res) => dispatch({type: ppActionTypes.GET_PPS, payload: res.data}))
      .catch(err => console.log(err));
  }
}

export const getPPdePM = (cohorteId, grupoId) => {
  return dispatch => {
    axios.get(`http://localhost:3006/pair/cohorte/${cohorteId}/grupo/${grupoId}`, { withCredentials: true })
      .then((res) => dispatch({type: ppActionTypes.GET_PP_PM, payload: res.data}))
      .catch(err => console.log(err));
  }
}

