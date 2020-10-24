import React, { useState } from 'react';
import { Popover, Card, CardMedia, CardActions, CardHeader, Typography, IconButton } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import useStyles from './estudiantesP.styles';

const perfil = {

    nombre: 'Manuel',
    apellido: 'Barna',
    foto: 'https://www.soyhenry.com/static/MANU-800a7fffdc31e8be6dddc7a9b573f5f9.png',
    edad: '30',
    localidad: 'Buenos Aires',
    email: 'manu@gmail.com',
    rol: 'Estudiante',
    password: '123123',
}

function Estudiante(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const classes = useStyles();
    return (
        <div >
            <Card className={classes.card}>
                <CardHeader subheader={perfil.apellido}>
                </CardHeader>
                <CardMedia className={classes.media}
                    image={perfil.foto}
                >
                </CardMedia>
                <CardActions disableSpacing>
                    <div className={classes.botones}>
                        <IconButton >
                            <MailOutlineIcon color='secondary' aria-label="email" onClick={handleClick} />
                        </IconButton>
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
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
                        <Typography className={classes.typography}> {perfil.email} </Typography>
                    </Popover>
                </CardActions>
            </Card>
        </div>
    )
}

const mapStateToProps = ({ user }) => ({
    user
})

export default connect(mapStateToProps, null)(Estudiante)