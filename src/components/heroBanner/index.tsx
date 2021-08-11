import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { translations } from '../../translations';
import Image from 'next/image';
import heroBannerImg from '../../assets/img/interview.webp';
import Typist from 'react-typist';

const useStyles = makeStyles((theme) => ({
    sessionMainDiv: {
        justifyContent: 'space-between',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            paddingTop: '50px',
            flexDirection: 'column',
            minHeight: '300px'
        }
    },
    sessionMainText: {
        marginTop: '200px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
            marginBottom: '20px'
        }
    },
    sessionMainImg: {
        maxHeight: '500px'
    },
    mainImg: {
        zIndex: -1
    },
    subTitle: {
        marginTop: '20px'
    },
    subTitleBackspace: {
        color: theme.palette.primary.main,
        fontWeight: 800
    }
}));

const HeroBanner: React.FC = () => {
    const classes = useStyles();

    const [count, setCount] = useState(1);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
            <Grid item xs={12} sm={12} md={5} className={classes.sessionMainText}>
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
            {matches ? (
                <Grid item xs={12} sm={12} md={7} className={classes.sessionMainImg}>
                    <Image
                        src={heroBannerImg}
                        alt={heroBanner.altText}
                        className={classes.mainImg}
                    />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default HeroBanner;
