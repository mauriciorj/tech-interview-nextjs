import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Header from '../../components/header';
import Footer from '../../components/footer';
import QuestionCard from '../../components/questionCard';
import BreadCrumbs from '../../components/breadCrumbs';
import { translations } from '../../translations';
import { questionsDb } from '../../db/questionsDb';

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
    footer: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex'
    },
    sessionMainDiv: {
        flexGrow: 1,
        textAlign: 'left',
        marginTop: '40px',
        marginBottom: '50px'
    },
    breadCrumbs: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: '20px'
        }
    },
    title: {
        marginTop: '30px',
        marginLeft: '20px',
        marginBottom: '20px',
        width: '100%'
    },
    cardSession: {
        marginTop: '40px',
        marginLeft: '20px',
        marginBottom: '20px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '20px',
            paddingRight: '10px'
        }
    }
}));

const Questions = () => {
    const classes = useStyles();
    const router = useRouter();

    const {
        en: { logo }
    } = translations;

    const {
        query: { questionsId }
    } = router;

    let title = questionsId;
    if (questionsId) {
        const toString = questionsId.toString();
        title = toString.charAt(0).toUpperCase() + toString.slice(1);
    }

    const breadCrumb = [
        {
            link: '/',
            title: 'Home'
        },
        {
            title: `Questions: ${questionsId}`
        }
    ];

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getQUestions = questionsDb.en.filter((item) => item.tech === questionsId);

    return isMounted ? (
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
                <Grid container item xs={12} className={classes.sessionMainDiv}>
                    <Grid item xs={12} sm={1} md={1}></Grid>
                    <Grid item xs={11} sm={10}>
                        <Box className={classes.breadCrumbs}>
                            <BreadCrumbs breadCrumbInfo={breadCrumb} />
                        </Box>
                        <Box className={classes.title}>
                            <Typography variant="h4">{title}</Typography>
                        </Box>
                        <Grid item xs={12} md={12} className={classes.cardSession}>
                            {getQUestions.map((item) => (
                                <QuestionCard
                                    answer={item.answer}
                                    key={item.id}
                                    id={item.id}
                                    level={item.level}
                                    question={item.question}
                                />
                            ))}
                        </Grid>
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

export default Questions;
