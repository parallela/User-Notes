import React from 'react';
import {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {isLogged} from '../components/isLogged';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    card: {
        width: '25%',
        margin: '0 2% 2% 0'
    },
    media: {
        height: 140,
    },
});

export default function Notes() {
    const classes = useStyles();
    const [hasError, setErrors] = useState(false);
    const [notes, setNotes] = useState([]);

    if (!isLogged()) {
        window.location = '/user/login';
    }

    async function fetchData() {
        const res = await fetch(window.$apiURL + "/user/notes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        });
        res
            .json()
            .then(res => setNotes(res))
            .catch(err => setErrors(err));
    }

    document.title = "Notes.BG | Вашите бележки";

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            {hasError &&
            <Alert severity="error">{hasError}</Alert>
            }
            {notes.map((note, key) => (
                <Card className={classes.card} key={key}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={note.image}
                            title={note.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {note.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {note.content.substring(0, 60)}...
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Пусни публично
                        </Button>
                        <Button size="small" component={Link} to={"/see/" + note.slug} color="primary">
                            ВИЖ
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Grid>
    );
}
