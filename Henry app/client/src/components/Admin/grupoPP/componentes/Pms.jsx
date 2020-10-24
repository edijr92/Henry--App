import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import s from "./pm.module.css"
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import IconButton from '@material-ui/core/IconButton';
import Nav from "../../grupoPM/componentes/nav"
import Cohorte from "../../grupoPM/componentes/cohorte.jsx"
import Title from "../../grupoPM/componentes/title"
import { connect, useSelector, useDispatch } from 'react-redux';
import { getCohorte } from '../../../../store/actions/cohorte'

export default function GrupoPm(props) {
    const dispatch = useDispatch();
    const cohorte = useSelector((state) => state.cohorte.cohortes);

    useEffect(() => {
        // Cuando se abra el componente, dispachar la accion que va a hacer el get para que traiga el pp del usuario logeado
        dispatch(getCohorte())
    }, [])

    const [RenderTable, setRenderTable] = useState(0);

    const renderCohort = function (id) {
        setRenderTable(id)

    }


    return (
        <div style={{ display: 'flex' }} >
            <div className={s.container + " " + s.margin}>
                <Nav />
                <Title />
                {cohorte && cohorte.map((cohorte) => (
                    <div>
                    <Cohorte cohorte={cohorte} render={() => renderCohort(cohorte.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}