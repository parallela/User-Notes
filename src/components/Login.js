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
import Alert from '@material-ui/lab/Alert';

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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors,setErrors] = useState(false);
  const [errormsg,setErrorMsg] = useState("");

  const submitLogin = () => {
    const details = {
      "email": email,
      "password": password
    }

    validateEmail(details.email);
    validatePassword(details.psasword);

    fetch(window.$apiURL + '/user/login', 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details),
    }
    ).then((res) => {
      if(res.status === 401) {
        setEmailError("Невалидни данни за вход!");
      }
      if(res.status === 403) {
        res.json().then(data => {
          setEmailError(data.error);
          setErrorMsg("Моля първо потвърдете акаунта си от вашата е-поща!")
        });
      }
      return res.json()
    }).then((data) => {
      if(data.token !== undefined) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refresh-token', data.refresh_token);
        setErrors(false);
        setEmailError("");
        history.push('/');
      }
    }).catch(err => setErrors(true))
  }

  function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var validate = regex.test(email);

    if(validate === false) {
      setEmailError("Невалидна Е-поща");
    } else {
      setEmailError("");
    }
    
    if(email === "") {
      setEmailError("Моля въведете Е-Поща");
    }
  }

  function validatePassword(password) {
    if(password === "") {
      setPasswordError("Моля въведете парола");
    } else {
      setPasswordError("");
    }
  }
  document.title = "Notes.BG | Влизане";

  useEffect(() => {
      const jwt_token = getJwtToken()
      if(jwt_token) {
        history.push('/');
      }
  },[email,password]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {errors &&
           <Alert severity="error">{errormsg}</Alert>
        }
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Влез в Notes.BG
        </Typography>
        <form className={classes.form} onSubmit={e => { e.preventDefault(); }} noValidate>
          <TextField
            helperText={emailError}
            error={emailError !== ""}
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
            helperText={passwordError}
            error={passwordError !== ""}
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
              <Link href="/user/register" variant="body2">
                {"Регистрирай се!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
