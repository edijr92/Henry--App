import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import s from "./contenedor.module.css"
import Nav from "../grupoPM/componentes/nav"
import Title from "../grupoPM/componentes/nav"
import { connect, useSelector, useDispatch } from 'react-redux';
import TablaUsuarios from '../grupoPM/componentes.student/crudAlumno';

export default function Contenedor(props) {

    // useEffect(() => {
    //     // Cuando se abra el componente, dispachar la accion que va a hacer el get para que traiga el pp del usuario logeado
    //     dispatch(getCohorte())
    // }, [])

  
    return (
        <div style={{ display: 'flex' }} >
            <div className={s.container + " " + s.margin}>
        
                <TablaUsuarios /> 
            </div>
        </div>
    );
}