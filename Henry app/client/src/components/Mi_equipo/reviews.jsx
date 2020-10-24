import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { IconButton, TextField, Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useSelector, useDispatch } from 'react-redux'
import { postFeedback } from "../../store/actions/feedback"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Reviews({ calificado }) {

    const dispatch = useDispatch();
    //feedback----------------------------------------------------------------
    const userReview = useSelector((state) => state.user.user.id);
    const alCalificar = calificado;
    //------------------------------------------------------------------------
    const [value, setValue] = useState({
        social: 0,
        skill: 0,
        comentario: '',
        userId: userReview,
        alumnoId: alCalificar
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitFeedback = (e) => {
        e.preventDefault();
        dispatch(postFeedback(value))
        setOpen(false)
    }

    const handleCalificacion = (e, arepa) => {
        e.preventDefault();
        setValue({
            ...value,
            [e.target.name]: e.target.value,
            [arepa]: e.target.value
        })

    }

    return (
        <div>
            <IconButton size='small' variant="outlined" color="secondary" onClick={handleClickOpen}>
                <RateReviewIcon />
            </IconButton>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div style={{ width: '400px' }}>
                    <DialogTitle id="alert-dialog-slide-title"> Califica a tu compañero</DialogTitle>
                    <DialogContent>
                        <Typography> Social Skills
                    <Box component="fieldset" borderColor="transparent">
                                <Rating
                                    name={"social" + alCalificar}
                                    value={value['social' + alCalificar]}
                                    onChange={(e) => {
                                        handleCalificacion(e, 'social')
                                    }}
                                />
                            </Box>
                        </Typography>
                        <Typography> Technical Skills
                    <Box component="fieldset" borderColor="transparent">
                                <Rating
                                    name={"skill" + alCalificar}
                                    value={value['skill' + alCalificar]}
                                    onChange={(e) => {
                                        handleCalificacion(e, 'skill')
                                    }}
                                />
                            </Box>
                        </Typography>
                        <TextField name={'comentario' + alCalificar} value={value['comentario' + alCalificar]} onChange={(e) => {
                            handleCalificacion(e, 'comentario')
                        }} label="Deja tu Comentario" autoFocus margin="dense" type="text" color='secondary' fullWidth />

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cerrar
          </Button>
                        <Button onClick={(e) => { submitFeedback(e) }} color="secondary">
                            Aceptar
          </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}