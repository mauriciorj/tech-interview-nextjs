import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { translations } from '../../translations';
import Image from 'next/image';
import heroBanner from '../../assets/img/interview.webp';

const useStyles = makeStyles((theme) => ({
    sessionMainDiv: {
        flexGrow: 1,
        justifyContent: 'space-between',
        textAlign: 'center'
    },
    sessionMainText: {
        marginTop: '200px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
            marginBottom: '20px'
        }
    },
    sessionMainImg: {
        textAlign: 'end'
    }
}));

const HeroBanner = () => {
    const classes = useStyles();

    return (
        <Grid container item xs={12} className={classes.sessionMainDiv}>
            <Grid item xs={12} sm={12} md={6} className={classes.sessionMainText}>
                <Typography variant="h4">{translations.en.heroBanner.title}</Typography>
                <Typography variant="subtitle1">{translations.en.heroBanner.text}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.sessionMainImg}>
                <Image
                    src={heroBanner}
                    alt={translations.en.heroBanner.altText}
                    width={500}
                    height={500}
                />
            </Grid>
        </Grid>
    );
};

export default HeroBanner;
