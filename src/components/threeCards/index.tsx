import React from 'react';
import { Avatar, Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { translations } from '../../translations';

interface PropsStyle {
    backgroundColor: string;
    color: string;
}

const useStyles = makeStyles((theme) => ({
    sessionTitle: {
        textAlign: 'center',
        marginTop: '40px',
        marginBottom: '40px',
        color: theme.palette.themeGrey.dark
    },
    sessionWrap: {
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: '30px',
        marginBottom: '30px'
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        minHeight: '230px'
    },
    paperTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        color: theme.palette.themeGrey.dark
    },
    avatarCard: {
        height: '70px',
        width: '70px',
        color: theme.palette.white.main,
        backgroundColor: theme.palette.primary.main
    },
    cardText: {
        color: theme.palette.themeGrey.dark,
        textAlign: 'center',
        marginTop: '20px'
    }
}));

const ThreeCards = () => {
    const classes = useStyles();

    const {
        en: { threeCards }
    } = translations;

    return (
        <>
            <Box className={classes.sessionTitle}>
                <Typography variant="h4">{threeCards.title}</Typography>
            </Box>
            <Grid container item laptop={12} xs={12} spacing={2} className={classes.sessionWrap}>
                {threeCards.card.map((card, index) => (
                    <Grid item md={3} xs={10} key={`cardKey-${index}`}>
                        <Paper elevation={3} className={classes.paper}>
                            <Box className={classes.paperTitle}>
                                <Avatar alt="Remy Sharp" className={classes.avatarCard}>
                                    <Typography variant="h3">{card.title}</Typography>
                                </Avatar>
                            </Box>
                            <Box className={classes.cardText}>
                                <Typography variant="subtitle1">{card.text}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ThreeCards;
