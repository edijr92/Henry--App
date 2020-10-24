import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// import s from "./title.module.css"
import s from './title.module.css'

export default function Title() {
  return (
    <div className={s.grid}>
      <div className={s.letra}> Nombre </div>
      <div className={s.letra}> Apellido </div>
      <div className={s.letra}> Localidad </div>
      <div className={s.letra}> Mail </div>
      <div className={s.letra}> Reviews </div>
    </div>
  );
}

