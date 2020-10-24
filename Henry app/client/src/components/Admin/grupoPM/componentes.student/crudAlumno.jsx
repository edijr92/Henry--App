import React, { useState, forwardRef, useEffect } from 'react';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from "react-redux";
import { getAlumnos, putAlumno } from '../../../../store/actions/alumnos'
import { getGrupo } from '../../../../store/actions/grupoPM'
import { dropUser } from "../../../../store/actions/user"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Feedback from './getReviews';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function CrudAlumnos() {
    const dispatch = useDispatch();
    const alumnos = useSelector((state) => state.alumnos.alumnos);
    const cohortes = useSelector((state) => state.cohorte.cohortes);
    const gruposPM = useSelector((state) => state.grupoPM.gruposPM);
    const pps = useSelector((state) => state.pairPrograming.grupos);
    const [edit, setEdit] = useState({
        open: false,
        alumnoId: null,
        cohorteId: null
    });

    const [dropped, setDropped] = useState({
        open: false,
        alumnoId: ""
    });
    const handleInputChange = (e, value) => {
        const input = e.target.id.split("-")[0];
        console.log(e.target.id, input, value)
        setEdit({ ...edit, [input]: value.id });
        console.log(edit);
    }
    const handleCohorte = (e, value) => {
        setEdit({ ...edit, cohorteId: value.id });
        dispatch(getGrupo(value.id));
    }
    const handleGrupoPM = (e, value) => {
        setEdit({ ...edit, grupoId: value.id });
    }
    useEffect(() => {
        // Cuando se abra el componente, dispachar la accion que va a hacer el get para que traiga el pp del usuario logeado
        dispatch(getAlumnos())

    }, [])
    const handleEdit = () => {
        dispatch(putAlumno(edit)).then(() => {
            dispatch(getAlumnos());
        });

    };
    const handleDelete = async (id) => {
        await dispatch(dropUser(id))
        dispatch(getAlumnos());
    };
    //delete dialog
    const handleClickOpened = (id) => {
        setDropped({
            ...dropped,
            open: true,
            alumnoId: id
        })
    };

    const handleClosed = () => {
        setDropped({
            ...dropped,
            open: false
        })
    };
    //edit dialog
    const handleClickOpen = (alumnoId) => {
        setEdit({
            ...edit,
            open: true,
            alumnoId
        });
    };

    const handleClose = () => {
        setEdit({
            ...edit,
            open: false
        });
    };
    if (alumnos.length)
        return (
            <TableContainer component={Paper}>
                <Table style={{ width: 'auto' }}>
                    <TableHead>
                        <StyledTableRow>
                            {Object.keys(alumnos[0]).map(key => (
                                <StyledTableCell variant="head">{key.toUpperCase()}</StyledTableCell>
                            ))}
                            <StyledTableCell variant="head">EDITAR</StyledTableCell>
                            <StyledTableCell variant="head">ELIMINAR</StyledTableCell>
                            <StyledTableCell variant="head">FEEDBACK</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {alumnos.map(alumno => (
                            <TableRow>
                                {(() => {
                                    let keys = [];
                                    for (let key in alumno) {
                                        keys.push(alumno[key])
                                    }
                                    return keys.map(cell => {
                                        return (
                                            <TableCell>{
                                                typeof cell === "boolean" ?
                                                    (cell ? <Check /> : <Close />) :
                                                    cell
                                            }</TableCell>
                                        );
                                    })
                                })()}
                                <Button component={TableCell} onClick={() => handleClickOpen(alumno.id)}><Edit /></Button>
                                <Dialog open={edit.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Editar Alumno</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Edita el grupo de cohorte, pm o pair de un alumno.
                            </DialogContentText>
                                        <Autocomplete
                                            id="cohorteId"
                                            options={cohortes}
                                            getOptionLabel={(option) => option.nombre}
                                            onChange={handleCohorte}
                                            style={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} color='secondary' autoFocus margin="dense" label="Cohortes" variant="outlined" />}
                                        />
                                        <Autocomplete
                                            id="grupoId"
                                            options={gruposPM}
                                            getOptionLabel={(option) => option.nombre}
                                            onChange={handleGrupoPM}
                                            style={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} color='secondary' autoFocus margin="dense" label="Grupo PM" variant="outlined" />}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="secondary">
                                            Cancelar
                            </Button>
                                        <Button onClick={() => { handleEdit(); handleClose() }} color="secondary">
                                            Aceptar
                            </Button>
                                    </DialogActions>
                                </Dialog>
                                <Button component={TableCell} onClick={() => { handleClickOpened(alumno.id); }}><DeleteOutline /></Button>
                                <Dialog
                                    open={dropped.open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClosed}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle id="alert-dialog-slide-title">{"Eliminar alumno"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            ¿Seguro que quieres eliminar este alumno?
                                </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClosed} color="secondary">
                                            Cancelar
                                </Button>
                                        <Button onClick={() => { handleDelete(dropped.alumnoId); handleClosed() }} color="secondary">
                                            Aceptar
                                </Button>
                                    </DialogActions>
                                </Dialog>
                                <Feedback alumno={alumno.id} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    return (<div>ESPERE</div>)
}
