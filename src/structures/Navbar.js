import React from 'react';
import {useState} from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from '@material-ui/icons/Note';
import HomeIcon from '@material-ui/icons/Home';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {NavLink} from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        active: {
            backgroundColor: theme.palette.action.selected,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export default function Navbar() {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <ListItem button key="Home" component={NavLink} to="/" exact activeClassName={classes.active}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary="Начало"/>
            </ListItem>

            <ListItem button key="Моите бележки" component={NavLink} to="/my/notes" activeClassName={classes.active}>
                <ListItemIcon><NoteIcon/></ListItemIcon>
                <ListItemText primary="Моите Бележки"/>
            </ListItem>

            <ListItem button key="Публични бележки" component={NavLink} to="/public/notes"
                      activeClassName={classes.active}>
                <ListItemIcon><SpeakerNotesIcon/></ListItemIcon>
                <ListItemText primary="Публични Бележки"/>
            </ListItem>

            <Divider/>

            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <AccountBoxIcon/>
                </ListItemIcon>
                <ListItemText primary="Акаунт"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Акаунт"/>
                    </ListItem>
                </List>
            </Collapse>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem component={NavLink} to="/user/logout" button className={classes.nested}>
                        <ListItemIcon>
                            <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Излез"/>
                    </ListItem>
                </List>
            </Collapse>

        </List>
    )
}