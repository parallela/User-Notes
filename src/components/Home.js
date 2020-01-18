import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <h2>Добре дошли, (Potrebitel)</h2>
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