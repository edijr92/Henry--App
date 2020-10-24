import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import s from "./nav.module.css"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar className={s.nav}>
          <Typography variant="h6" className={classes.title}>
            <span className={s.titulo}> Mi equipo </span>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

