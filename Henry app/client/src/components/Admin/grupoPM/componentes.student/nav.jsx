import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import s from "./nav.module.css"
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Popover, Grid, Container, Card, CardMedia, CardActions, CardHeader, Divider, Typography, IconButton, Chip } from '@material-ui/core';
import { Slide, Dialog, DialogActions, DialogContent, DialogContentText , DialogTitle, Button } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
import axios from 'axios';
import CrudAlumnos from './crudAlumno';
import { getAlumnosid } from "../../../../store/actions/alumnos"
import {useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ButtonAppBar({ cohorteId }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [putUsuario, setPutUsuario] = useState('')
  const [Emails, setEmails] = useState([]);
  const dispatch = useDispatch();
  const regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi;
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleConfirm = () => {
    setOpenEdit(false);
      return axios.post('http://localhost:3006/alumnos/agregar',
        {
          emails: putUsuario.emails.match(regex),
          cohorteId,
        }, { withCredencials: true })
        .then( () => dispatch (getAlumnosid(cohorteId)))
        .catch(err => console.log(err))
        
  };


  //handleSubmit
  const handleSubmit = (e) => {
    setPutUsuario({
      ...putUsuario,
      emails: e.target.value,
    })
  }
  // ----------------------------------------------------------
  const [openEdit2, setOpenEdit2] = useState(false);
  const handleClickOpenEdit2 = () => {
    setOpenEdit2(true);
  };

  const handleCloseEdit2 = () => {
    setOpenEdit2(false);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar className={s.nav}>
          <Typography variant="h6" className={classes.title}>
            <span className={s.titulo}>Cohorte</span>
          </Typography>
          {/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          <IconButton color='primary' onClick={handleClickOpenEdit}>
            <EditIcon />
          </IconButton>
          <Dialog open={openEdit} onClose={handleCloseEdit} TransitionComponent={Transition} keepMounted aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="form-dialog-title">Agregar Estudiantes</DialogTitle>
            <DialogContentText>
              Separar por: (,) (:) (;) (\) (,) (Enter) o (Espacio)
            </DialogContentText>
            <DialogContent>
              <TextField onChange={handleSubmit} value={putUsuario.emails} label="E-mails" name="emails" autoFocus margin="dense" type="text" color='secondary' 
              fullWidth
              multiline
              />
              {putUsuario.emails && putUsuario.emails.match(regex) && putUsuario.emails.match(regex).map(email =>
                <Chip label={email} color="primary" onDelete={() =>{
                  const newEmails = putUsuario.emails.replace(email, "");
                  setPutUsuario({...putUsuario, emails: newEmails.trim()});
                }}/>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="secondary">
                Cancelar
            </Button>
              <Button onClick={() => {
                handleConfirm();
              }} color="secondary">
                Agregar
            </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </div>
  );
}