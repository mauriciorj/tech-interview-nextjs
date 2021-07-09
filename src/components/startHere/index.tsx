import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { translations } from '../../translations';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
    sessionTitle: {
        textAlign: 'center',
        marginTop: '40px',
        marginBottom: '40px',
        color: theme.palette.white.main
    },
    techArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    techBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '20px'
    },
    techTitle: {
        marginLeft: '10px',
        color: theme.palette.white.main
    }
}));

const StartHere = () => {
    const classes = useStyles();

    const { en: { techList } } = translations;

    return (
        <>
            <Box className={classes.sessionTitle}>
                <Typography variant="h4">Start Here</Typography>
            </Box>
            <Grid item xs={12} className={classes.techArea}>
                {techList.map((tech, index) => (
                    <Grid key={`tech-${index}`} className={classes.techBox}>
                        <Box>
                            <Image
                                src={`/icons/${tech.icon}`}
                                alt={tech.title}
                                width={50}
                                height={50}
                            />
                        </Box>
                        <Box className={classes.techTitle}>
                            <Typography variant="h6">{tech.title}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default StartHere;
