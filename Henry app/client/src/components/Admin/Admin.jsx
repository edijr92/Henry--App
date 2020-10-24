import React, { useEffect, useState } from "react";
import { Link, Route, useHistory, useParams, useRouteMatch } from 'react-router-dom'
import s from "./AdminPage.module.css";
import NuevoCohorte from "./nuevocohorte/nuevocohorte"
import GrupoPP from "./grupoPP/grupoPP"
import GrupoPM from "./grupoPM/grupoPM"
import Contenedor from './usuarios/contenedortabla.jsx'
import Notas from "./Notas/notas"

//material ui
import ReceiptIcon from "@material-ui/icons/Receipt";
import GroupIcon from '@material-ui/icons/Group';
import ListAltIcon from "@material-ui/icons/ListAlt";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import { emphasize, withStyles } from '@material-ui/core/styles';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

export default function AdminPage() {
  useEffect(() => {
    let temp = <h3>Bienvenido al panel de administracion</h3>;
    setComponent(temp);
  }, []);
  const match = useRouteMatch();
  const [component, setComponent] = useState();
  const history = useHistory();
  let route = history.location.pathname.split("/");
  route = route.slice(0, route.length - 1);
  //const {componente} = useParams();
  const renderComponent = function (componente) {
    var element;
    switch (componente) {
      case "Cohortes":
        element = <GrupoPM />;
        break;
      case "Nuevo_Cohorte":
        element = <NuevoCohorte />;
        break;
      case "Administración_De_Grupos":
        element = <GrupoPP />;
        break;
      case "Administración_De_Usuarios":
        element = <Contenedor />
        break;
      case "Notas":
        element = <Notas />
        break;
      default:
        element = <h2>Entro al default</h2>;
        break;

    }
    return (element);
  };
  return (
    <div className={s.admin}>
      <Breadcrumbs separator="›" color="secondary">
        {route.map(path => <Link to={route.join("/").slice(0, route.join("/").indexOf(path) + path.length)}><StyledBreadcrumb label={path} /> </Link>)}
      </Breadcrumbs>
      <div className={s.aside}>
        <h3> Menu </h3>
        <Link to={`${match.url}/Cohortes`} className={s.Link}>
          <label htmlFor="Cohortes">
            <ReceiptIcon className={s.icon} />
          Administracion de cohortes
        </label>
        </Link>
        <input
          type="radio"
          onChange={(e) => renderComponent(e)}
          id="Nuevo_Cohorte"
          name="menu"
          value="categories"
          className={s.obeja}
        />
        <Link to={`${match.url}/Nuevo_Cohorte`} className={s.Link}>
          <label htmlFor="Nuevo_Cohorte">
            <ListAltIcon className={s.icon} />
          Nuevo cohorte
        </label>
        </Link>
        <Link to={`${match.url}/Administración_De_Grupos`} className={s.Link} >
          <label htmlFor="Administración_De_Grupos">
            <GroupIcon className={s.icon} />
          Administracion de PM's y PP's
        </label>
        </Link>
        <Link to={`${match.url}/Administración_De_Usuarios`} className={s.Link}>
          <label htmlFor="Administración_De_Usuarios">
            <ReceiptIcon className={s.icon} />
          Administracion de alumnos
        </label>
        </Link>
        <Link to={`${match.url}/Notas`} className={s.Link}>
          <label htmlFor="Notas">
            <ReceiptIcon className={s.icon} />
          Administracion de notas
        </label>
        </Link>
        <input
          type="radio"
          onChange={(e) => renderComponent(e)}
          id="Notas"
          name="menu"
          value="categories"
          className={s.obeja}
        />
      </div>
      <Route path={`${match.path}/:componentes`} render={({ match }) => {
        return (<div className={s.main}>{renderComponent(match.params.componentes)}</div>);
      }} />
    </div>
  );
}
