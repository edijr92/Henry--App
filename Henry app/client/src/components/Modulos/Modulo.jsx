import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Container } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { getClases } from '../../store/actions/clases';
import { useParams } from 'react-router-dom';
import useStyles from './Modulo.styles'
import { Redirect } from 'react-router';
import axios from "axios";
export default function Modulo(props) {
    const [video, setVideo] = useState()
    const [nombreVideo, setNombreVideo] = useState('Introduccion')
    const [redirect, setRedirect] = useState(false)
    const classes = useStyles();
    const { modulo } = useParams();
    const dispatch = useDispatch();
    const modulos = useSelector((state) => state.clases.clases);

    console.log(modulo)
    useEffect(() => {
        dispatch(getClases(modulo))
    }, [modulo])
    useEffect(() => {
        if (!!modulos.length) {
            let init = modulos.filter(m => m.modulo === modulo && m.clase.slice(0, 1) === '1');
            if (!!init.length) axios.get("https://vimeo.com/api/oembed.json?url=" + init[0].link + "&width=1024&height=480")
                .then(res => setVideo(res.data.html))
                .catch(err => console.log(err))
        }
    }, [modulos])
    const changeVideo = (e, video) => {
        e.preventDefault()
        axios.get("https://vimeo.com/api/oembed.json?url=" + video.link + "&width=1024&height=480")
            .then(res => setVideo(res.data.html))
            .catch(err => console.log(err))
        setNombreVideo(video.clase)
    };
    if (redirect) {
        return <Redirect to="/Home" />;
    }

    return (
        <div className={classes.contenedor}>
            <Typography variant="h2">
                {modulo} - {nombreVideo}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: video }} />
            <div>
                <Container container='true' >
                    <Grid item key={video} xs={12} sm={12} md={12} lg={12}>
                        {modulos.map((video) => (
                            <Button className={classes.boton} color='primary' variant="contained" href="#contained-buttons" onClick={(e) => changeVideo(e, video)}>
                                <Typography variant="h5"> {video.clase} </Typography>
                            </Button>
                        )
                        )}
                    </Grid>
                </Container>

                <Button variant="contained" className={classes.botonRegresar} onClick={setRedirect} >
                    Regresar
                    </Button>
            </div>
        </div>

    );
}  
