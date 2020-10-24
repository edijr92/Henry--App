import React, { useState } from "react";
import s from "./registrarse.module.css"

import { Button, CssBaseline, TextField, FormHelperText } from '@material-ui/core';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Link from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { IconButton } from '@material-ui/core';
import imagen from "../../images/check.png";
import axios from 'axios';
import { useHistory } from "react-router-dom";
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Henry App
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },

}));
export default function Registrarse() {
    const classes = useStyles();
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const redirect = useHistory();
    const [field, setField] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        localidad: "",
        edad: "",
    });
    const [image, setImage] = useState();

    //     const uploadImg = async (e) => {
    //     const files = e.target.files;
    //     var newImages = [];

    //     setImages(newImages);

    //   };

    //   const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //       const fileReader = new FileReader();
    //       fileReader.readAsDataURL(file);

    //       fileReader.onload = () => {
    //         resolve(fileReader.result);
    //       };

    //       fileReader.onerror = (error) => {
    //         reject(error);
    //       };
    //     });
    //   };


    const handleChange = function (e) {
        setField({
            ...field,
            [e.target.name]: e.target.value
        });
    }

    // CONECTAR BACK CON FRONT 
    const submitUser = function (e) {
        e.preventDefault()

        if (field.password !== field.repassword) {
            return alert("", "...Las contraseñas deben coincidir!")
        }

        axios.post('http://localhost:3006/user', {
            nombre: field.nombre,
            apellido: field.apellido,
            email: field.email,
            password: field.password,
            localidad: field.localidad,
            edad: field.edad,
            active: true,
            image,
        }, { withCredentials: true })
            .then(res => {
                const { status, message } = res.data; // Siempre vamos a mandar un status en register, para verificar que esta logueado (ok) o no (error).
                if (status === 'error') {
                    setError(true);
                    setHelperText(`Error al registrarse: ${message}`);
                } else { // el usuario se creo bien
                    setHelperText('')
                }
                redirect.replace("/")
            }).catch(err => {
                //console.log(err.response)
                //setHelperText(err.response)
            })
    }

    return (
        <div>
            <div >

                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <img src={imagen} />
                        <Typography component="h1" variant="h5">
                            Registrarse
                    </Typography>
                        <form className={classes.form} noValidate onSubmit={submitUser}>
                            <TextField
                                color='secondary'
                                type='text'
                                value={field.nombre}
                                color='secondary'
                                name="nombre"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                                onChange={handleChange}
                                className={s.margin}
                            />
                            <TextField
                                color='secondary'
                                type="text"
                                variant="outlined"
                                value={field.apellido}
                                color='secondary'
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="apellido"
                                onChange={handleChange}
                                className={s.margin}
                            />
                            <TextField
                                color='secondary'
                                type="email"
                                value={field.email}
                                variant="outlined"
                                color='secondary'
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                className={s.margin}
                            />
                            <TextField
                                color='secondary'
                                value={field.password}
                                variant="outlined"
                                color='secondary'
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                className={s.margin}
                            />
                            <TextField
                                color='secondary'
                                value={field.repassword}
                                variant="outlined"
                                color='secondary'
                                required
                                fullWidth
                                name="repassword"
                                label="Confirme su contraseña"
                                type="password"
                                id="repassword"
                                autoComplete="current-password"
                                onChange={handleChange}
                                className={s.margin}
                            />
                            <TextField
                                color='secondary'
                                type='text'
                                value={field.localidad}
                                name="localidad"
                                variant="outlined"
                                color='secondary'
                                required
                                fullWidth
                                id="localidad"
                                label="Localidad"
                                autoFocus
                                onChange={handleChange}
                                className={s.margin}
                            />
                            <TextField
                                color='secondary'
                                type='text'
                                value={field.edad}
                                name="edad"
                                variant="outlined"
                                color='secondary'
                                required
                                fullWidth
                                id="edad"
                                label="Edad"
                                onChange={handleChange}
                                className={s.margin}
                            />

                            <div className={classes.root}>
                                <input accept="image/*" className={classes.input} name="imagen" id="icon-button-file" type="file" onChange={(e) => {
                                    const input = e.target;
                                    const reader = new FileReader();
                                    reader.onloadend = function () {
                                        setImage(reader.result)
                                    }
                                    reader.readAsDataURL(input.files[0])
                                    { console.log(input.files[0]) }
                                }} />
                                <label htmlFor="icon-button-file">
                                    <div>
                                        <IconButton color="secondary" aria-label="upload picture" component="span">
                                            <AddAPhotoIcon />
                                        </IconButton>
                                        <Typography>Agregar foto de perfil</Typography>
                                    </div>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Registrarse
                    </Button>
                            <FormHelperText error={error}> {helperText} </FormHelperText>
                            <Link href="http://localhost:3000" variant="body2">
                                <Typography color='secondary'> ¿Ya tiene una cuenta? Ingresar </Typography>

                            </Link>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>


            </div>
        </div>
    )
}       