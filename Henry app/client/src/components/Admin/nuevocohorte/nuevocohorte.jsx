import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import s from './nuevocohorte.module.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { setCohorte } from '../../../store/actions/cohorte.js'
import { useSelector, useDispatch } from "react-redux";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function NuevoCohorte(props) {

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

  return (
    <div className={s.admin} >
      <div className={s.aside}>
        <h3> Crear nuevo cohorte</h3>
        <div>
          <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                name="name"
                color='secondary'
                label="Fecha de inicio"
                format="dd/M/yyyy"
                inputVariant="outlined"
                variant="dialog"
                orientation="portrait"
                invalidDateMessage="Formato invalido"
                value={cohorteA["fecha"]}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <TextField
            color='secondary'
            variant="outlined"
            margin="normal"
            required
            label="Nombre de cohorte"
            fullWidth
            type="text"
            name="nombre"
            value={cohorteA.nombre}
            onChange={handleInputChange}
            autoFocus />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => dispatch(setCohorte(cohorteA))}>
            Agregar cohorte
          </Button>

        </div>
      </div>
    </div>

  );
}

