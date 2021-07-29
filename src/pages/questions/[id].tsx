import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
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
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export interface Props {
    map(
        arg0: (item: { answer: string; id: string; level: string; question: string }) => JSX.Element
    ): React.ReactNode;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    sort(arg0: (a: QuestionType, b: QuestionType) => 1 | 0 | -1): any;
    data: {
        answer: string;
        id: string;
        level: string;
        order: number;
        question: string;
        tech: string;
    }[];
}

export interface QuestionType {
    answer: string;
    id: string;
    level: string;
    order: number;
    question: string;
    tech: string;
}

const Questions: React.FC<Props> = ({ data }) => {
    const classes = useStyles();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [questionsList, setQuestionsList] = useState<Array<QuestionType> | []>([]);
    const [pagesNumber, setPagesNumber] = useState<number>(0);
    const [questionsPerPage, setQuestionsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentQuestions, setCurrentQuestions] = useState<Array<QuestionType> | []>([]);

    const {
        en: { og_url, techList }
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

    const sortQuestions = (data: Props) => {
        const orderQuestions = data.sort((a: QuestionType, b: QuestionType) =>
            a.order > b.order ? 1 : b.order > a.order ? -1 : 0
        );
        setQuestionsList(orderQuestions);

        const lastItemIndex = currentPage * questionsPerPage;
        const firstItemIndex = lastItemIndex - questionsPerPage;
        const questionToShow = orderQuestions.slice(firstItemIndex, lastItemIndex);
        setCurrentQuestions(questionToShow);
    };

    useEffect(() => {
        const lastItemIndex = currentPage * questionsPerPage;
        const firstItemIndex = lastItemIndex - questionsPerPage;
        const questionToShow = questionsList.slice(firstItemIndex, lastItemIndex);
        setCurrentQuestions(questionToShow);
    }, [currentPage]);

    useEffect(() => {
        setIsMounted(true);
        if (data) {
            sortQuestions(data as unknown as Props);
            const calcQuestionsPerPage = data.length / questionsPerPage;
            setPagesNumber(calcQuestionsPerPage);
        }
    }, []);

    const onChangePagination = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const getDescription = techList?.find((item) => item);

    return isMounted ? (
        <div className={classes.root}>
            <Grid container item xs={12}>
                <Head>
                    <title>{title} Questions</title>
                    <meta name="description" content={getDescription?.description} />
                    <meta property="og:url" content={`${og_url}questions/${id}`} />
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
                            {currentQuestions?.map(
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
                        <Grid item xs={12} md={12} className={classes.pagination}>
                            <Pagination
                                count={pagesNumber}
                                shape="rounded"
                                color="primary"
                                onChange={(event, page) => onChangePagination(event, page)}
                            />
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
