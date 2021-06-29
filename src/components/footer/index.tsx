import React from 'react';
import { Grid, makeStyles, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { translations } from '../../translations';

const useStyles = makeStyles((theme) => ({
   sessionWrap: {
        flexGrow: 1,
        marginTop: '30px',
        marginBottom: '30px',
        justifyContent: 'center',
    },
    footerTitle: {
        color: theme.palette.white.main,
    },
    footerTechList: {
        color: theme.palette.white.main,
    }
}));

const Footer = () => {

    const classes = useStyles();

    return (
        <>
        <Grid container item laptop={12} xs={12} spacing={2} className={classes.sessionWrap}>
            <Grid item md={3} xs={10}>
                <Typography variant="h5" className={classes.footerTitle}>{translations.en.logo}</Typography>
            </Grid>
            <Grid item md={3} xs={10} className={classes.footerTechList}>
                <Typography variant="h6">{translations.en.footer.techList}</Typography>
                <List dense>
                    <ListItem>
                        <ListItemText primary="Javascript" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="React" />
                    </ListItem>
                </List>
            </Grid>
            <Grid item md={3} xs={10}>
                <Typography variant="subtitle1" className={classes.footerTechList}><strong>{translations.en.footer.contactUs}</strong> {translations.en.footer.contactUsEmail}</Typography>
            </Grid>
        </Grid>
        </>
    )

}

export default Footer;