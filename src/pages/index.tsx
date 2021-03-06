import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/header';
import HeroBanner from '../components/heroBanner';
import ThreeCards from '../components/threeCards';
import StartHere from '../components/startHere';
import StayTuned from '../components/stayTuned';
import OurNumbers from '../components/ourNumbers';
import Footer from '../components/footer';
import Aos from 'aos';
import 'aos/dist/aos.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    header: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        display: 'flex'
    },
    heroBanner: {
        display: 'flex'
    },
    ThreeCards: {
        backgroundColor: theme.palette.themeGrey.light,
        display: 'flex',
        paddingBottom: '70px'
    },
    startHere: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        paddingBottom: '70px'
    },
    stayTuned: {
        display: 'flex',
        marginTop: '20px',
        marginBottom: '80px',
        height: '300px'
    },
    ourNumbers: {
        backgroundColor: theme.palette.themeGrey.light,
        display: 'flex',
        paddingBottom: '70px'
    },
    footer: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex'
    }
}));

const Home: React.FC = () => {
    const classes = useStyles();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
        Aos.init({ duration: 2000, once: true });
    }, []);

    return isMounted ? (
        <div className={classes.root}>
            <Grid container item xs={12}>
                <Grid item xs={12} className={classes.header}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Header />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.heroBanner}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <HeroBanner />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.ThreeCards}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <ThreeCards />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.startHere} data-aos="fade">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <StartHere />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.stayTuned} data-aos="fade">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <StayTuned />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.ourNumbers} data-aos="fade">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <OurNumbers />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.footer}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Footer />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    ) : null; // TODO: create a pre loading skeleton
};

export default Home;
