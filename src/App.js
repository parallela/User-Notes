import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Home from './components/Home';
import Notes from './components/Notes';
import Navbar from './structures/Navbar';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import HeaderBar from './structures/HeaderBar';
import Login from './components/Login';

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


export default function App() {
    const classes = useStyles();

    return (
    <Router>
        <div className={classes.root}>
            <CssBaseline />
            <HeaderBar /> 
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />

                <Divider />
                
                <Navbar />

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                      <AnimatedSwitch
                      atEnter={{ opacity: 0 }}
                      atLeave={{ opacity: 0 }}
                      atActive={{ opacity: 1 }}
                      className="switch-wrapper"
                      >
                          <Route path="/" exact component={Home} />
                          <Route path="/my/notes" component={Notes} />
                          <Route path="/see/:slug" />
                          <Route path="/user/signin" component={Login} />
                      </AnimatedSwitch>
                </Typography>
            </main>
        </div>
    </Router>
    )
}