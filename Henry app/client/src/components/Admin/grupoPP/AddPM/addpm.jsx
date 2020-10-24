import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import s from './addpm.module.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { setPm, getGrupo } from '../../../../store/actions/grupoPM.js'
import { useSelector, useDispatch } from "react-redux";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale'
import CloseIcon from '@material-ui/icons/Close';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// SETCOHORTE ES LA ACCION 

export default function AddPM({ onClose, cohorteid }) {

  const cohorte = useSelector((state) => state.cohorte.cohorte)

  const [cohorteA, setCohorteA] = useState({ cohorte })
  const dispatch = useDispatch()
  const handleDateChange = (date) => {
    setCohorteA({
      ...cohorteA,
      "fecha": date
    })
  }
  const handleInputChange = (e) => {
    setCohorteA({
      ...cohorteA,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = () => {
    dispatch(setPm(cohorteA.nombre, cohorteid)).then(() => {
      dispatch(getGrupo(cohorteid))
    })
  }
  return (
    <div className={s.admin} >
      <div className={s.aside}>
        <span>
          <h3> Agregar nuevo PM</h3>

        </span>

        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Nombre de PM"
            fullWidth
            type="text"
            name="nombre"
            value={cohorteA.nombre}
            onChange={handleInputChange}
            color='secondary'
            autoFocus />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

            onClick={handleSubmit}

          >
            Agregar
          </Button>
          <div className={s.boton}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>

        </div>
      </div>
    </div>

  );
}
