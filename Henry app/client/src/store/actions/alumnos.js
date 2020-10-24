import axios from "axios";

export const alumnosActionTypes = {
  GET_ALUMNOS: 'GET_ALUMNOS',
  GET_ALUMNOS_COHORTE: "GET_ALUMNOS_COHORTE",
  PUT_USER_GRUPO: "PUT_USER_GRUPO",
  PUT_USER_COHORTE: "PUT_USER_COHORTE",
  PUT_USER_PP: "PUT_USER_PP",
  GET_NOTA: "GET_NOTA"
}

  export const getAlumnosid = (id) => {
    return (dispatch) => {
      axios.get(`http://localhost:3006/alumnos/cohorte/${id}`, {withCredentials: true}).then((res) => {
      dispatch({
          type: alumnosActionTypes.GET_ALUMNOS_COHORTE,
          payload: res.data
        });
      }).catch(err => console.log(err));
    };
  };

  //get todos los usuarios
export const getAlumnos = () => {
  return dispatch => {
      axios.get("http://localhost:3006/alumnos/", {withCredentials: true})
      .then ((res) => dispatch ({type: alumnosActionTypes.GET_ALUMNOS, payload: res.data}))
      .catch (err => console.log(err))
  }
}
//actualiza el grupo pm de un usuario
export const putUsuarioGrupo = ({usuarioId, grupoId}) => {
  return dispatch => {
      return axios.put("http://localhost:3006/alumnos/grupo/agregar",{
      usuarioId: usuarioId,
      grupoId: grupoId
      }, {withCredentials: true})
      .then((res) => dispatch ({type: alumnosActionTypes.PUT_USER_GRUPO, payload: res.data}))
      .catch(err => console.log(err))
      }
  }
//put a un cohorte de usuario
  export const putAlumno = (values) => {
    console.log(values)
      return dispatch => {
          return axios.put("http://localhost:3006/alumnos/editar", {
            usuarioId : values.alumnoId,
            cohorteId: values.cohorteId,
            grupoId: values.grupoId,
          } , {withCredentials: true})
          .then (res => dispatch ({type:alumnosActionTypes.PUT_USER_COHORTE, payload: res.data}))
          .catch(err => console.log(err))
      }
  }
//actualiza el grupo pp de un usuario
  export const putUsuarioPp = ({usuarioId,pairId}) => {
    return dispatch => {
      axios.put ("http://localhost:3006/alumnos/pair/agregar", {
        usuarioId: usuarioId,
        pairId: pairId
      }, {withCredentials: true})
      .then((res) => dispatch ({type:alumnosActionTypes.PUT_USER_PP, payload:res.data}))
      .catch(err => console.log(err))
    }
  }

  //trae alumnos con notas

  export const getNotasPosta = () => {
    return dispatch => {
      return axios.get ("http://localhost:3006/alumnos/notas", {withCredentials: true}
      ).then((res) =>dispatch({type: alumnosActionTypes.GET_NOTA, payload: res.data})
        ).catch(err => console.log(err))
    }
  }


  
