import React, { useState, forwardRef, useEffect } from 'react';
import { Redirect } from "react-router-dom"
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from "react-redux";
import { getGrupo } from '../../../../store/actions/grupoPM'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useParams } from 'react-router-dom';
import { getPPdePM } from '../../../../store/actions/pairprogramming';
import s from './tabla.module.css'
import AddPM from '../AddPM/addpm'
import TarjetaPP from './tarjetaPP';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CrudAlumnos() {
  const dispatch = useDispatch();
  const { cohorte } = useParams();
  const cohortes = useSelector((state) => state.cohorte.cohortes);
  const pps = useSelector((state) => state.pairPrograming.grupos);
  const gruposPM = useSelector((state) => state.grupoPM.gruposPM);
  const gruposPPdePm = useSelector((state) => state.pairPrograming.gruposDePm);
  const [redirect, setRedirect] = useState(false)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [renderAdd, setrenderAdd] = useState(false)

  useEffect(() => {
    // Cuando se abra el componente, dispachar la accion que va a hacer el get para que traiga el pp del usuario logeado
    dispatch(getGrupo(cohorte))

  }, [cohorte])

  const setrenderagregar = function () {
    setrenderAdd(true);

  }

  const onClose = function () {
    setrenderAdd(false);
  }

  const handleClickOpen = (grupoId) => {
    setOpen(true);
    dispatch(getPPdePM(cohorte, grupoId))
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (redirect) {
    return <Redirect to="/Admin" />;
  }

  if (gruposPM.length)
    return (
      <div>
        <TableContainer component={Paper} style={{ width: '90%' }} className={s.container}>
          <TableHead>
            <StyledTableRow>
              {Object.keys(gruposPM[0]).map(key => (

                <StyledTableCell variant="head">{key.toUpperCase()}</StyledTableCell>
              ))}
              <StyledTableCell variant="head">EDITAR</StyledTableCell>
              <StyledTableCell variant="head">ELIMINAR</StyledTableCell>
              <StyledTableCell variant="head">VER GRUPO</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {gruposPM.map(grupo => (
              <TableRow>
                {(() => {
                  let keys = [];
                  for (let key in grupo) {
                    keys.push(grupo[key])
                  }
                  return keys.map(cell =>
                    (<TableCell>{cell}</TableCell>)
                  )
                })()}
                <Button component={TableCell}><Edit /></Button>
                <Button component={TableCell}><DeleteOutline /></Button>
                <Button component={TableCell} onClick={() => handleClickOpen(grupo.id)}>Ver Grupo PM</Button>

                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                  <IconButton edge="end" color="secondary" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <TarjetaPP grupoPP={gruposPPdePm} grupoId={grupo.id} cohorteId={grupo.cohorteId} cerrar={() => handleClose()} />
                </Dialog>
              </TableRow>
            ))}
          </TableBody>
          <div className={s.regresar}>
            <Button variant="contained" color="primary" onClick={setRedirect} className={s.regresar}>Regresar </Button>
            <Button variant="contained" color="primary" onClick={setrenderagregar} className={s.agregar}>Agregar PM </Button>
          </div>
        </TableContainer>
        {renderAdd && <AddPM onClose={onClose} cohorteid={cohorte} />}

      </div>

    );
  return (<div>ESPERE...</div>);
}
