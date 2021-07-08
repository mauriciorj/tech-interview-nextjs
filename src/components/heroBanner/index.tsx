import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { translations } from '../../translations';
import Image from 'next/image';
import heroBanner from '../../assets/img/interview.webp';
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

    useEffect(() => {
        setCount(1);
    }, [count]);

    const textBackspace = translations.en.heroBanner.textBackspace.length;
    const wholeText = translations.en.heroBanner.text.length + translations.en.heroBanner.textafterBackspaceHighlighted.length + translations.en.heroBanner.textafterBackspace.length + 1;

    return (
        <Grid container item xs={12} className={classes.sessionMainDiv}>
            <Grid item xs={12} sm={12} md={6} className={classes.sessionMainText}>
                <Typography variant="h4">{translations.en.heroBanner.title}</Typography>
                <Typography variant="h5" className={classes.subTitle}>
                        {count ? (
                            <Typist avgTypingDelay={80} onTypingDone={() => setCount(0)}>
                                {translations.en.heroBanner.text}{translations.en.heroBanner.textBackspace}
                                <Typist.Backspace count={textBackspace} delay={800} />
                                <span className={classes.subTitleBackspace}>{translations.en.heroBanner.textafterBackspaceHighlighted}</span> {translations.en.heroBanner.textafterBackspace}
                                <Typist.Delay ms={1000} />
                                <Typist.Backspace count={wholeText} delay={800} />
                                <Typist.Delay ms={1000} />
                            </Typist>
                        ) : (
                            ""
                        )}
                </Typography>
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
