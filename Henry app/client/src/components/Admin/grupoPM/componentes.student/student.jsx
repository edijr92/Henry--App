import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// import s from "./title.module.css"
import s from './student.module.css'



export default function Student({ alumnos }) {
  return (
    <div className={s.grid}>
      <div className={s.letra}> {alumnos.nombre} </div>
      <div className={s.letra}> {alumnos.apellido} </div>
      <div className={s.letra}> {alumnos.edad} </div>
      <div className={s.letra}> {alumnos.email} </div>
    </div>
  );
}
