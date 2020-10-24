import React from 'react';
import s from "./input.module.css"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import imagen from "../../images/check.png"
import { useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux'
import { setUser } from '../../store/actions/user'
import { useHistory } from "react-router-dom"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Henry App
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Input(props) {
  const redirect = useHistory()
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const classes = useStyles();

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value
    });
  }
  const handleInput = function (e) {
    e.preventDefault();
    Axios.post("http://localhost:3006/user/login", fields, { withCredentials: true })
      .then(res => {
        props.setUser(res.data.user)
        redirect.replace("/home")
      })
      .catch(err => console.log(err.response));
  }
  return (
    <div>
      <div className={s.container}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img src={imagen} />
            <Typography component="h1" variant="h5">
              Ingresar
                    </Typography>
            <form className={classes.form} noValidate onChange={(e) => handleChange(e)}>
              <TextField
                variant="outlined"
                margin="normal"
                color='secondary'
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                color='secondary'
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    /> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={s.amarillo + " " + classes.submit + " " + s.color}
                onClick={handleInput}
              >
                Ingresar
                    </Button>

            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
})

export default connect(null, mapDispatchToProps)(Input)