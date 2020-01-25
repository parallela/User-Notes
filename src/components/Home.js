import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getJwtToken } from '../helpers/jwt';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    card: {
        width: 275,
        display: 'flex' 
    },
    welcome: {
        margin: "0 2% 2% 0"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
  }),
);

export default function Home() {
    const classes = useStyles();
    const [user,setUserData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        document.title = "Notes.BG | Начало";
        const jwt_token = getJwtToken()
        if(!jwt_token) {
          history.push('/user/login');
        }


        fetch(window.$apiURL + '/user',
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer "+localStorage.getItem('token')
            },
        }
        ).then((res)=>{
            return res.json()
        }).then((data) => {
            setUserData(data);
        }).catch(err => {
            // TODO ERROR
        });
    },[]);

    return (
        <React.Fragment>
        <CssBaseline />
        <Container fixed>
        <Typography variant="h5" component="h2" className={classes.welcome}>Добре дошъл {user.username}</Typography>
                <Grid container direction="row" justify="space-between" alignItems="left">
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Вашите бележки
                            </Typography>
                            <Typography variant="h5" component="h2">
                            100
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            активни публични
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Вашите бележки
                            </Typography>
                            <Typography variant="h5" component="h2">
                            100
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            активни публични
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Вашите бележки
                            </Typography>
                            <Typography variant="h5" component="h2">
                            100
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            активни публични
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
        </Container>
      </React.Fragment>
    )
}