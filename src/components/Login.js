import React from 'react';
import { useState, useEffect } from 'react';
import { getJwtToken } from '../helpers/jwt';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
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

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const  [email, setEmail] = useState("");
  const  [password, setPassword] = useState("");

  const submitLogin = () => {
    const details = {
      "email": email,
      "password": password
    }

    fetch(window.$apiURL + '/user/login', 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details),
    }
    ).then((res) => {
      return res.json()
    }).then((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh-token', data.refresh_token);
      history.push('/')
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
      const jwt_token = getJwtToken()
      if(jwt_token) {
        history.push('/');
      }
      document.title = "Notes.BG | Влизане";
  },[]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Влез в Notes.BG
        </Typography>
        <form className={classes.form} onSubmit={e => { e.preventDefault(); }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Е-Поща"
            name="email"
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Парола"
            type="password"
            onChange={e => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitLogin}
          >
            Влез
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забравих си паролата!
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Нямам акаунт"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
