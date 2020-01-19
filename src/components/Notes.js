import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Notes() {
  const classes = useStyles();
  const [hasError, setErrors] = useState(false);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://localhost:5000/api/user/1/notes");
      res
        .json()
        .then(res => setNotes(res))
        .catch(err => setErrors(err));
    }

    fetchData();
  });

    return (
        <Grid container direction="row" justify="space-evenly" alignItems="left">
            <div>{JSON.stringify(notes)}</div>
            <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image="https://i.imgur.com/s4W5rIY.jpg"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Пусни публично
                        </Button>
                        <Button size="small" color="primary">
                        ВИЖ
                        </Button>
                    </CardActions>
                </Card>
        </Grid>
    );
}
