import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {AnimatedSwitch} from 'react-router-transition';
import Home from './components/Home';
import {isLogged} from './components/isLogged';
import Notes from './components/Notes';
import Navbar from './structures/Navbar';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import HeaderBar from './structures/HeaderBar';
import Login from './components/Login';
import {createMuiTheme} from '@material-ui/core/styles';
import Register from './components/Register';
import Auth from './components/Auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,
    }),
);
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});


export default function App() {
    const classes = useStyles();

    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <HeaderBar/>

                    {isLogged() &&
                    <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
                        <div className={classes.toolbar}/>
                        <Navbar/>
                    </Drawer>
                    }

                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Typography component={'span'} variant={'body2'} paragraph>
                            <AnimatedSwitch
                                atEnter={{opacity: 0}}
                                atLeave={{opacity: 0}}
                                atActive={{opacity: 1}}
                                className="switch-wrapper"
                            >

                                <Route path="/see/:slug"/>
                                <Route path="/user/login" component={Login}/>
                                <Route path="/user/register" component={Register}/>
                                <Auth>
                                    <Route path="/" exact component={Home}/>
                                    <Route path="/my/notes" component={Notes}/>
                                </Auth>
                            </AnimatedSwitch>
                        </Typography>
                    </main>
                </div>
            </ThemeProvider>
        </Router>
    )
}