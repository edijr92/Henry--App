import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
// import s from "./title.module.css"
import s from './cohorte.module.css';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


export default function Cohorte({ cohorte, render }) {
  return (
    <div className={s.grid}>
      <Button className={s.button} onClick={ () => render()} variant="contained" color="primary">
        {cohorte.nombre} 
      </Button>
    </div>
  );
}
