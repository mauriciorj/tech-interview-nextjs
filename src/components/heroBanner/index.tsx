import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { translations } from '../../translations';
import Image from 'next/image';
import heroBannerImg from '../../assets/img/interview.webp';
import Typist from 'react-typist';

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
    },
    subTitle: {
        marginTop: '20px'
    },
    subTitleBackspace: {
        color: theme.palette.primary.main,
        fontWeight: 800
    }
}));

const HeroBanner = () => {
    const classes = useStyles();

    const [count, setCount] = useState(1);

    const {
        en: { heroBanner }
    } = translations;

    useEffect(() => {
        setCount(1);
    }, [count]);

    const textBackspace = heroBanner.textBackspace.length;
    const wholeText =
        heroBanner.text.length +
        heroBanner.textafterBackspaceHighlighted.length +
        heroBanner.textafterBackspace.length +
        1;

    return (
        <Grid container item xs={12} className={classes.sessionMainDiv}>
            <Grid item xs={12} sm={12} md={6} className={classes.sessionMainText}>
                <Typography variant="h4">{heroBanner.title}</Typography>
                <Typography variant="h5" className={classes.subTitle}>
                    {count ? (
                        <Typist avgTypingDelay={80} onTypingDone={() => setCount(0)}>
                            {heroBanner.text}
                            {heroBanner.textBackspace}
                            <Typist.Backspace count={textBackspace} delay={800} />
                            <span className={classes.subTitleBackspace}>
                                {heroBanner.textafterBackspaceHighlighted}
                            </span>{' '}
                            {heroBanner.textafterBackspace}
                            <Typist.Delay ms={1000} />
                            <Typist.Backspace count={wholeText} delay={800} />
                            <Typist.Delay ms={1000} />
                        </Typist>
                    ) : (
                        ''
                    )}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.sessionMainImg}>
                <Image src={heroBannerImg} alt={heroBanner.altText} width={500} height={500} />
            </Grid>
        </Grid>
    );
};

export default HeroBanner;
