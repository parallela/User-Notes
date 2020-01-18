import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from '@material-ui/icons/Note';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
        backgroundColor: theme.palette.action.selected,
    },
  }),
);

export default function Navbar() {
    const classes = useStyles();

    return (
    <List>
          <ListItem button key="Home" component={NavLink} to="/" exact activeClassName={classes.active}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Начало" />
          </ListItem>
          <ListItem button key="Моите бележки" component={NavLink} to="/my/notes" activeClassName={classes.active}>
            <ListItemIcon><NoteIcon /></ListItemIcon>
            <ListItemText primary="Моите Бележки" />
          </ListItem>
    </List>
    )
}