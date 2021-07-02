import React from 'react';
import { Avatar, Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { translations } from '../../translations';

const useStyles = makeStyles((theme) => ({
    sessionTitle: {
        textAlign: 'center',
        marginTop: '40px',
        marginBottom: '40px',
        color: theme.palette.themeGrey.main,
    },
    sessionWrap: {
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: '30px',
        marginBottom: '30px',
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
    },
    paperext: {
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    avatarCard: {
        color: 'white',
        height: '70px',
        width: '70px',
    },
    avatarCardTitleLight: {
        color: 'white',
        backgroundColor: theme.palette.primary.light,
    },
    avatarCardTitleMain: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
    },
    avatarCardTitleDark: {
        color: 'white',
        backgroundColor: theme.palette.primary.dark,
    },
}));

const ThreeCards = () => {
    const classes = useStyles();

    return (
        <>
        <Box className={classes.sessionTitle}>
            <Typography variant="h4">{translations.en.threeCards.title}</Typography>
        </Box>
        <Grid container item laptop={12} xs={12} spacing={2} className={classes.sessionWrap}>
            {translations.en.threeCards.card.map((card, index) =>
            {
                let color;

                if(index === 0){
                    color = 'avatarCardTitleLight'
                }else if (index === 2){
                    color = 'avatarCardTitleDark'
                }else{
                    color = 'avatarCardTitleMain'
                }

            return (
            <Grid item md={3} xs={10} key={`cardKey-${index}`}>
                <Paper elevation={3} className={classes.paper}>
                    <Box className={classes.paperTitle}>
                        <Avatar alt="Remy Sharp" className={`${classes.avatarCard} ${classes[color]}`}>
                            <Typography variant="h3">{card.title}</Typography>
                        </Avatar>
                    </Box>
                    <Box className={classes.paperext}>
                        <Typography variant="subtitle1">{card.text}</Typography>
                    </Box>
                </Paper>
            </Grid>
            )})}
        </Grid>
        </>
    );
};

export default ThreeCards;
