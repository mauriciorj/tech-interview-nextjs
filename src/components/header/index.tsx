import React from 'react';
import { translations } from '../../translations';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        boxShadow: 'none',
        position: 'relative'
    }
}));

const Header = () => {
    const classes = useStyles();

    const {
        en: { logo }
    } = translations;

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {logo}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
