import React, { useState, useEffect } from 'react';
import { TextField, Popover, Grid, Container, Card, CardMedia, CardActions, CardHeader, Typography, Divider, IconButton } from '@material-ui/core';
import { Slide, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import useStyles from './MiPerfil.styles';
import Trayectoria from './Trayectoria'
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { putUser, rePass, logOut } from "../../store/actions/user"
import { useHistory } from 'react-router-dom';


// Funcion para el efecto de slide en el dialogo
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function MiPerfil(props) {
    const classes = useStyles();
    const history = useHistory();
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch()

    // PopOver del email
    const [popOverMail, setPopOverMail] = useState(null);

    const handleClickMail = (event) => {
        setPopOverMail(event.currentTarget);
    };

    const handleClose = () => {
        setPopOverMail(null);
    };

    const open = Boolean(popOverMail);
    const mail = open ? 'simple-popover' : undefined;

    //Actualizar usuario
    const [putUsuario, setPutUsuario] = useState(user)


    useEffect(() => {
        Axios.get("http://localhost:3006/user/me", { withCredentials: true })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }, [])

    /// Dialogo para modificar datos de MiPerfil
    const [openEdit, setOpenEdit] = useState(false);

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    //handleSubmit
    const handleSubmit = (e) => {
        setPutUsuario({
            ...putUsuario,
            [e.target.name]: e.target.value,
        })
    }
    //

    /// Dialogo para modificar contraseña
    const [openPass, setOpenPass] = useState(false);

    const handleClickOpenPass = () => {
        setOpenPass(true);
    };

    const handleClosePass = () => {
        setOpenPass(false);

    };


    // Modificar Contraseña
    const [pass, setPass] = useState({
        password: '',
        newPass: '',
        repassword: ''
    });

    const handleCloseEdit = () => {
        setOpenEdit(false);

    };

    let handlePassChange = (e) => {
        setPass({
            ...pass,
            [e.target.name]: e.target.value
        })
    }
    const submitNewPass = async () => {
        await dispatch(rePass(pass));
        setOpenPass(false);
        await dispatch(logOut());
        history.replace("/");
    }

    // Modificar Imagen
    const [image, setImage] = useState();


    return (
        <div>
            <Container className={classes.contenedor} >
                <Grid className={classes.contenedor} container>
                    {/* ACA EMPIEZA LA TARJETA */}
                    <Grid item xs={10} sm={7} md={7} lg={8}>
                        <div className={classes.div1}>
                            <Grid xs={10} sm={10} md={7} lg={5}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        title={user.nombre + ' ' + user.apellido}
                                    />
                                    <CardMedia className={classes.media}
                                        image={user.image}
                                    >
                                    </CardMedia>
                                    <CardActions disableSpacing>
                                        <Typography color="textSecondary">
                                            {user.rol}
                                        </Typography>
                                        <Divider variant="middle" orientation="vertical" flexItem />
                                        <IconButton color='secondary' aria-label="email" onClick={handleClickMail}>
                                            <MailOutlineIcon />
                                        </IconButton>
                                        <Popover
                                            id={mail}
                                            open={open}
                                            anchorEl={popOverMail}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <Typography className={classes.typography}> {user.email} </Typography>
                                        </Popover>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </div>
                    </Grid>
                    {/* ACA EMPIEZA LA DESCRIPCION DE PERFIL */}
                    <Grid item xs={10} sm={7} md={4} lg={4}>
                        <div className={classes.div2}>
                            <Card className={classes.card2}>
                                <TextField value={user.nombre} label="Nombre" name="nombre" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                <TextField value={user.apellido} label="Apellido" name="apellido" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                <TextField value={user.edad} label="Edad" name="edad" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                <TextField value={user.localidad} label="Localidad" name="localidad" autoFocus margin="dense" color='secondary' type="text" fullWidth />
                                <TextField value={user.email} label="Email" name="email" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                <TextField value={user.rol} label="Rol" name="rol" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                <IconButton onClick={handleClickOpenEdit} color='secondary' aria-label="editar" >
                                    <EditIcon />
                                </IconButton>
                                <Dialog open={openEdit} onClose={handleCloseEdit} TransitionComponent={Transition} keepMounted aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                                    <DialogTitle id="form-dialog-title">Modificar mi perfil</DialogTitle>
                                    <DialogContent>
                                        <TextField onChange={handleSubmit} value={putUsuario.nombre} label="Nombre" name="nombre" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                        <TextField onChange={handleSubmit} value={putUsuario.apellido} label="Apellido" name="apellido" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                        <TextField onChange={handleSubmit} value={putUsuario.edad} label="Edad" name="edad" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                        <TextField onChange={handleSubmit} value={putUsuario.localidad} label="Localidad" name="localidad" autoFocus margin="dense" color='secondary' type="text" fullWidth />
                                        <TextField onChange={handleSubmit} value={putUsuario.email} label="Email" name="email" autoFocus margin="dense" type="text" color='secondary' fullWidth />
                                        <input accept="image/*" className={classes.input} name="imagen" id="icon-button-file" type="file" onChange={(e) => {
                                            const input = e.target;
                                            const reader = new FileReader();
                                            reader.onloadend = function () {
                                                setImage(reader.result)
                                            }
                                            reader.readAsDataURL(input.files[0])
                                        }} />
                                        <label htmlFor="icon-button-file">
                                            <div>
                                                <IconButton color="secondary" aria-label="upload picture" component="span">
                                                    <AddAPhotoIcon />
                                                    <div></div>
                                                </IconButton>
                                                <Typography> Modificar foto de perfil</Typography>
                                            </div>
                                        </label>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseEdit} color="secondary">
                                            Cancelar
                                        </Button>
                                        <Button onClick={() => {
                                            handleCloseEdit();

                                            dispatch(putUser({ ...putUsuario, image: image }));

                                        }} color="secondary">
                                            Modificar
                                    </Button>
                                    </DialogActions>
                                </Dialog>

                                <IconButton onClick={handleClickOpenPass} color='secondary' aria-label="cambiar password" >
                                    <VpnKeyIcon />
                                </IconButton>
                                <Dialog open={openPass} onClose={handleClosePass} TransitionComponent={Transition} keepMounted aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                                    <DialogTitle id="form-dialog-title">Modificar mi contraseña</DialogTitle>

                                    <DialogContent>
                                        <TextField onChange={handlePassChange} value={pass.password} label="Contraseña" name="password" autoFocus margin="dense" type="password" color='secondary' fullWidth />
                                        <TextField onChange={handlePassChange} value={pass.newPass} id="password" label="Nueva contraseña" name="newPass" autoFocus margin="dense" type="password" color='secondary' fullWidth />
                                        <TextField onChange={handlePassChange} value={pass.repassword} id="repassword" label="Confirme su nueva contraseña" name="repassword" autoFocus margin="password" type="password" color='secondary' fullWidth />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClosePass} color="secondary">
                                            Cancelar
                                        </Button>
                                        <Button onClick={submitNewPass/*  */} color="secondary">
                                            Modificar
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </Container >
            <Trayectoria />
        </div >
    );
}


