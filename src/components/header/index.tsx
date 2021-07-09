import React from 'react';
import { translations } from '../../translations';
import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Grid,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    appBar: {
        boxShadow: 'none',
        position: 'relative'
    },
    innerHeader: {
        padding: '0px'
    },
    menuArea: {
        textAlign: 'end'
    },
    menu: {
        marginTop: '40px'
    },
    menuIcon: {
        marginRight: '10px',
        marginTop: '5px'
    },
    menuContactUs: {
        marginTop: '15px'
    }
}));

const Header = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const {
        en: { logo, headerMenu }
    } = translations;

    const renderMenuDesktop = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            className={classes.menu}
            disableScrollLock={true}>
            <MenuItem>
                <strong>{headerMenu.techTitle}</strong>
            </MenuItem>
            {headerMenu.techList.map((tech, index) => (
                <MenuItem key={`tech-${index}`}>
                    <Box className={classes.menuIcon}>
                        <Image
                            src={`/icons/${tech.icon}`}
                            alt={tech.title}
                            width={25}
                            height={25}
                        />
                    </Box>
                    {tech.title}
                </MenuItem>
            ))}
            <MenuItem className={classes.menuContactUs}>
                <strong>{headerMenu.contactUsTitle}</strong>
            </MenuItem>
            <MenuItem>
                <a href={'mailto:' + headerMenu.contactUsEmail}>{headerMenu.contactUsEmail}</a>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.innerHeader}>
                    <Grid item xs={6}>
                        <Typography variant="h6">{logo}</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.menuArea}>
                        {!matches ? (
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleProfileMenuOpen}>
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <Typography variant="h6" onClick={handleProfileMenuOpen}>
                                Techs
                            </Typography>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMenuDesktop}
        </div>
    );
};

export default Header;
