import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

  async function fetchData() {
    const res = await fetch(window.$apiURL + "/user/1/notes",{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    res
      .json()
      .then(res => setNotes(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  },[]);

    return (
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            {notes.map((note,key) => (
                          <Card className={classes.card} key={key}>
                          <CardActionArea>
                              <CardMedia
                              className={classes.media}
                              image={note[5]}
                              title={note[1]}
                              />
                              <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                  {note[1]}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  {note[4].substring(0,60)}...
                              </Typography>
                              </CardContent>
                          </CardActionArea>
                          <CardActions>
                              <Button size="small" color="primary">
                              Пусни публично
                              </Button>
                                <Button size="small" component={Link} to={"/see/"+note[2]} color="primary">
                                ВИЖ
                                </Button>
                          </CardActions>
                      </Card>
            ))}
        </Grid>
    );
}
