import React from 'react';
import { Grid, makeStyles, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { translations } from '../../translations';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    sessionWrap: {
        flexGrow: 1,
        marginTop: '30px',
        marginBottom: '30px',
        justifyContent: 'center'
    },
    footerTitle: {
        color: theme.palette.white.main
    },
    footerTechList: {
        color: theme.palette.white.main
    }
}));

const Footer = () => {
    const classes = useStyles();

    const {
        en: { logo, contactEmail, techList, footer }
    } = translations;

    return (
        <>
            <Grid container item laptop={12} xs={12} spacing={2} className={classes.sessionWrap}>
                <Grid item md={3} xs={10}>
                    <Link href="/">
                        <a>
                            <Typography variant="h5" className={classes.footerTitle}>
                                {logo}
                            </Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item md={3} xs={10} className={classes.footerTechList}>
                    <Typography variant="h6">{footer.techList}</Typography>
                    <List dense>
                        {techList.map((item, index) => (
                            <ListItem key={`tech-item-${index}`}>
                                <Link href={item.link}>
                                    <a>
                                        <Typography variant="h5" className={classes.footerTitle}>
                                            <ListItemText primary={item.title} />
                                        </Typography>
                                    </a>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item md={3} xs={10}>
                    <Typography variant="subtitle1" className={classes.footerTechList}>
                        <strong>{footer.contactUs}</strong>{' '}
                        <a href={'mailto:' + contactEmail}>{contactEmail}</a>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default Footer;
