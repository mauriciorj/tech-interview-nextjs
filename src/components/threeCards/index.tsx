import React from 'react';
import { Avatar, Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { translations } from '../../translations';
import { theme as themeGlobal } from '../../styles/theme';

interface PropsStyle {
    backgroundColor: string;
    color: string;
}

const useStyles = makeStyles((theme) => ({
    sessionTitle: {
        textAlign: 'center',
        marginTop: '40px',
        marginBottom: '40px',
        color: theme.palette.themeGrey.main
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
        marginTop: '20px'
    },
    paperext: {
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'center'
    },
    avatarCard: {
        color: 'white',
        height: '70px',
        width: '70px',
        color: theme.palette.white.main,
        backgroundColor: theme.palette.primary.main
    }
}));

const ThreeCards = () => {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.sessionTitle}>
                <Typography variant="h4">{translations.en.threeCards.title}</Typography>
            </Box>
            <Grid container item laptop={12} xs={12} spacing={2} className={classes.sessionWrap}>
                {translations.en.threeCards.card.map((card, index) => (
                    <Grid item md={3} xs={10} key={`cardKey-${index}`}>
                        <Paper elevation={3} className={classes.paper}>
                            <Box className={classes.paperTitle}>
                                <Avatar alt="Remy Sharp" className={classes.avatarCard}>
                                    <Typography variant="h3">{card.title}</Typography>
                                </Avatar>
                            </Box>
                            <Box className={classes.paperext}>
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
