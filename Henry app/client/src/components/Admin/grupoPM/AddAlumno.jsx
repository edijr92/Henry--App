import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import s from './AdAlumno.module.css'
import Nav from "./componentes.student/nav"
import Student from "./componentes.student/student"
import Title from "./componentes.student/title"
import { connect } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";
import { getAlumnosid } from '../../../store/actions/alumnos.js'


export default function AddAlumno({id}) {
    // const [component, setComponent] = useState(),
    
    const dispatch = useDispatch();

    const cohorte = useSelector((state) => state.cohorte.cohortes);
    const alumnos = useSelector((state) => state.alumnos.alumnos_cohorte);
    
    useEffect(() => {
        // Cuando se abra el componente, dispachar la accion que va a hacer el get para que traiga el pp del usuario logeado
        dispatch(getAlumnosid(id))
    
    }, [id])



    return (
        <div className={s.container}>
            <Nav cohorteId={id} />
            <Title />
            {alumnos && alumnos.map((alumnos) => (
                <Student alumnos={alumnos}/>
            ))}
        </div>
    );
}