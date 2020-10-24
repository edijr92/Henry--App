import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import s from './navbar.module.css'
import imagen from "../../images/Henry logo.png"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';  
import PersonIcon from '@material-ui/icons/Person';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useDispatch} from 'react-redux';
import {logOut} from '../../store/actions/user';
import { connect } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={s.color}>
          
          <Typography variant="h6" className={classes.title + " " + s.letras + " " + s.espacio}>
           <Link to="/Home"> <img src={imagen} alt="" className={s.imagen}/> </Link> 
           <div className={s.divs + " " + s.equipo}> 
            {props.user.user && (<Link to="/miEquipo" className={s.nolink }> 
            <h6 className={s.titulosnav}> Tu equipo </h6>
            </Link>)}
           </div> 
           <div className={s.divs + " " + s.div}> 
            {props.user.user && (props.user.user.rol == 'pm' || props.user.user.rol == 'director') && (<Link to="/Admin" className={s.nolink}> 
            <h6 className={s.titulosnav + " " + s.espacio}> Administrar </h6>
            </Link>)}
           </div>         
          
           </Typography>

         {auth && (
            <div  className={s.user}>
              <IconButton
                aria-label="account  of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
               
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/miPerfil" className={s.nolink}><MenuItem  onClick={handleClose}>Mi Perfil</MenuItem></Link>
                <MenuItem onClick={() =>{
                  dispatch(logOut());
                  handleClose();
                }}> LogOut</MenuItem>
                
              </Menu>
            </div>
          )}
          
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  user
})

export default connect(mapStateToProps, null)(ButtonAppBar)