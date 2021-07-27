import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Header from '../../components/header';
import Footer from '../../components/footer';
import QuestionCard from '../../components/questionCard';
import BreadCrumbs from '../../components/breadCrumbs';
import { translations } from '../../translations';
import { questionsDb } from '../../db/questionsDb';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

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
        display: 'flex',
        alignItems: 'center',
        marginTop: '30px',
        marginLeft: '20px',
        marginBottom: '20px',
        width: '100%'
    },
    titleText: {
        paddingLeft: '15px'
    },
    divider: {
        marginLeft: '20px'
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

export interface Props {
    data: {
        answer: string;
        id: string;
        level: string;
        question: string;
    }[];
}

const Questions: React.FC<Props> = ({ data }) => {
    const classes = useStyles();
    const router = useRouter();

    const {
        en: { keywords, og_site_name, og_locale, og_type, og_url, techList }
    } = translations;

    const {
        query: { id }
    } = router;

    let title = id;
    if (id) {
        const toString = id.toString();
        title = toString.charAt(0).toUpperCase() + toString.slice(1);
    }

    const breadCrumb = [
        {
            link: '/',
            title: 'Home'
        },
        {
            title: `Questions: ${id}`
        }
    ];

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getQuestions = data;
    const getDescription = techList?.find((item) => item);

    return isMounted ? (
        <div className={classes.root}>
            <Grid container item xs={12}>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content={getDescription?.description} />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="keywords" content={keywords} />
                    <meta property="og:site_name" content={og_site_name} />
                    <meta property="og:locale" content={og_locale} />
                    <meta property="og:type" content={og_type} />
                    <meta property="og:url" content={`${og_url}questions/${id}`} />
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
                            <Image
                                src={`/icons/${getDescription?.icon}`}
                                alt={getDescription?.title}
                                width={50}
                                height={50}
                            />
                            <Typography variant="h4" className={classes.titleText}>
                                {title}
                            </Typography>
                        </Box>
                        <Divider className={classes.divider} />
                        <Grid item xs={12} md={12} className={classes.cardSession}>
                            {getQuestions.map(
                                (item: {
                                    answer: string;
                                    id: string;
                                    level: string;
                                    question: string;
                                }) => (
                                    <QuestionCard
                                        answer={item.answer}
                                        key={item.id}
                                        id={item.id}
                                        level={item.level}
                                        question={item.question}
                                    />
                                )
                            )}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    let data;

    switch (id as string) {
        case 'javascript':
            data = questionsDb.en.javascript;
            break;
        case 'react':
            data = questionsDb.en.react;
            break;
    }

    return { props: { data } };
};

export default Questions;
