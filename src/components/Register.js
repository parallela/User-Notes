import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import { getJwtToken } from '../helpers/jwt';
import { useHistory } from "react-router-dom";
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const  [email, setEmail] = useState("");
  const  [username, setUsername] = useState("");
  const  [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors,setErrors] = useState(false);
  const [errormsg,setErrorMsg] = useState("");

  const submitRegister = () => {

  	const details = {
  		"username": username,
  		"email": email,
  		"password": password,
  	}

  	validateEmail(details.email);
  	validateUsername(details.username);
  	validatePassword(details.password);

  	fetch(window.$apiURL + '/user/register', 
     {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details),
    }
    ).then((res) => {
	    if(res.status === 401) {
		    res.json().then(data => {
		    	setErrorMsg(data.error)
		    	setErrors(true)
		    })
	    }
      	return res.json()
    }).then((data) => {
        history.push('/user/login');
    }).catch(err => setErrors(true))

  }

  function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var validate = regex.test(email);

    if(validate === false) {
      setEmailError("Невалидна Е-поща");
      return false;
    } else {
      setEmailError("");
    }
    
    if(email === "") {
      setEmailError("Моля въведете Е-Поща");
    }
  }

  function validatePassword(password) {
  	var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  	var validate = regex.test(password);
    if(!validate) {
      setPasswordError("Моля въведете валидна парола! Изисквания: Трябва да има цифра,главна буква и 8 знака ");
      return false;
    } else {
      setPasswordError("");
    }
  }

  function validateUsername(username) {
  	var regex = /^[a-zA-Z0-9]+$/;
  	var validate = regex.test(username);

  	if(!validate) {
  		setUsernameError("Моля въведете валидно потребителско име!");
  		return false;
  	} else {
  		setUsernameError("");
  	}
  }

  document.title = "Notes.BG | Регистрация";

  useEffect(() => {

  },[username,email,password]);

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
          Регистрация
        </Typography>
        <form className={classes.form} onSubmit={e => { e.preventDefault(); }}  noValidate>
          <Grid container spacing={2}> 
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="username"
                variant="outlined"
                required
                helperText={usernameError}
	            error={usernameError !== ""}
                fullWidth
                id="username"
                onChange={ (e) => { setUsername(e.target.value); validateUsername(document.getElementById('username').value) } }
                label="Потребителско име"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
	            helperText={emailError}
	            error={emailError !== ""}
                id="email"
                label="Е-Поща"
                name="email"
                onChange={ (e) => { setEmail(e.target.value); validateEmail(document.getElementById('email').value) } }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                helperText={passwordError}
	            error={passwordError !== ""}
                fullWidth
                name="password"
                label="Парола"
                type="password"
                onChange={ (e) => { setPassword(e.target.value); validatePassword(document.getElementById('password').value) } }
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitRegister}
          >
            Регистрация
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/user/login" variant="body2">
                Имаш акаунт? Цъкни тук за да влезеш!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
