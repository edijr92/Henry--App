import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import { Route, Redirect } from "react-router-dom";
import Input from './components/Input_Prueba/Input'
import Home from './components/Home/Home';
import NavBar from './components/Navbar/NavBar';
import MiPerfil from './components/Mi_perfil/MiPerfil';
import Modulo from './components/Modulos/Modulo';
import Admin from './components/Admin/Admin';
import Info from './components/Tabla_info_Admin/Info';
import MiEquipo from './components/Mi_equipo/MiEquipo';
import Equipo2 from './components/Mi_equipo/Equipo2';
import Registrarse from './components/Registrarse/Registrarse';
import { connect } from 'react-redux';
import { pruebaRedux } from './store/actions/actionTest';
import Pm from './components/Admin/grupoPP/TablaPM/tablapm';
import store from './store/';
store.subscribe(() => {
  const { user } = store.getState();
  localStorage.setItem("user", JSON.stringify(user));
})
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(255 255 1)',
    },
    secondary: {
      main: 'rgb(0 0 0)',
    },
    terceary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00'
    }
  }
});

function App(props) {


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Route path="/">
          <NavBar />
        </Route>
        {/* -- Sin el Login el Usuario no va a poder hacer NADA-- */}
        <Route exact path="/">
          <Input />
        </Route>
        {/* Mas adelante vamos a poner el HomeUser en path="/" */}
        <Route exact path="/Home">
          {props.user.user ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/MiPerfil">
          {props.user.user ? <MiPerfil /> : <Redirect to="/" />}
        </Route>
        <Route path="/Registrarse">
          <Registrarse />
        </Route>
        <Route exact path="/Modulo/:modulo">
          {props.user.user ? <Modulo /> : <Redirect to="/" />}
        </Route>
        <Route path="/Admin">
          {props.user.user && props.user.user.rol === "director" ? <Admin /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/data">
          {/* Va a mostrar la informacion de todos los alumnos. Va a tener filtros por cohortes y pm */}
          {props.user.user ? <Info /> : <Redirect to="/" />}{/* Buscar nombre adecuado */}
        </Route>
        <Route exact path="/MiEquipo">
          {props.user.user ? <MiEquipo /> : <Redirect to="/" />}
        </Route >
        <Route exact path='/modulo:id'>
          {props.user.user ? <Modulo /> : <Redirect to="/" />}
        </Route>
        <Route exact path={`/Admin/grupoPm/:cohorte`}>
          {props.user.user && props.user.user.rol==="director"? <Pm />:<Redirect  to="/"/>}
        </Route>
      </ThemeProvider>
    </div>
  );
}

//REDUX INSTALADO STORE DE PRUEBA Y ACTION DE PRUEBA
const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = dispatch => ({
  pruebaRedux: prueba => dispatch(pruebaRedux(prueba))

})

export default connect(mapStateToProps, mapDispatchToProps)(App)

