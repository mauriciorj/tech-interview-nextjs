import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import { translations } from '../translations';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/header';
import ThreeCards from '../components/threeCards';
import HeroBanner from '../components/heroBanner';
import Footer from '../components/footer';

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
    mainDiv: {
        display: 'flex'
    },
    footer: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex'
    }
}));

export default function Home() {
    const classes = useStyles();

    const {
        en: { logo }
    } = translations;

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (isMounted ?
        <div className={classes.root}>
            <Grid container item xs={12}>
                <Head>
                    <title>{logo}</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Grid item xs={12} className={classes.header}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Header />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.mainDiv}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <HeroBanner />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.mainDiv}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <ThreeCards />
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
        : null // TODO: create a pre loading skeleton
    );
}
