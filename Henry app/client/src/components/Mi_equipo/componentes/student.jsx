import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// import s from "./title.module.css"
import s from './student.module.css';
import Reviews from '../reviews';
import { useSelector } from 'react-redux'



export default function Student({ key, student }) {

  const userLog = useSelector((state) => state.user.user.id);
  return (
    <div className={s.grid}>
      <div className={s.letra}> {student.nombre} </div>
      <div className={s.letra}> {student.apellido} </div>
      <div className={s.letra}> {student.localidad} </div>
      <div className={s.letra}> {student.email} </div>
      {student.id != userLog && student.rol === 'alumno' && <div className={s.letra}> <Reviews key={key} calificado={student.id} /></div>}
    </div>
  );
}
