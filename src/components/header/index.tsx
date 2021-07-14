import React, { useState } from 'react';
import { translations } from '../../translations';
import {
    AppBar,
    Box,
    Button,
    Divider,
    IconButton,
    Fade,
    Menu,
    MenuItem,
    Modal,
    Toolbar,
    Grid,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Image from 'next/image';
import Link from 'next/link';

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
        display: 'flex',
        justifyContent: 'flex-end'
    },
    menuDesktopIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    menuButton: {
        color: theme.palette.white.main
    },
    menu: {
        marginTop: '40px'
    },
    mobileMenu: {
        display: 'flex',
        alignContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.white.main,
        position: 'absolute'
    },
    mobileMenuHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: '35px',
        paddingRight: '13px',
        paddingTop: '15px'
    },
    mobileMenuHeaderTitle: {
        paddingTop: '5px'
    },
    mobileMenuHeaderCloseButton: {
        textAlign: 'end'
    },
    mobileMenuHeaderDivider: {
        marginTop: '10px'
    },
    mobileMenuContent: {
        minHeight: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    mobileMenuItemsHeader: {
        paddingTop: '20px',
        paddingLeft: '20px'
    },
    mobileMenuItemsItems: {
        display: 'flex',
        paddingTop: '15px',
        paddingLeft: '15px',
        alignItems: 'center'
    },
    mobileMenuFooter: {
        marginTop: '10px'
    },
    mobileMenuContactUs: {
        marginTop: '15px',
        paddingLeft: '20px'
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDesktopMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };

    const handleMobileMenuOpen = () => {
        setIsMobileMenuOpen(true);
    };

    const menuId = 'primary-search-account-menu';

    const {
        en: { logo, contactEmail, headerMenu, techList }
    } = translations;

    const body = (
        <Fade in={isMobileMenuOpen}>
            <Grid container item xs={12} className={classes.mobileMenu}>
                <Grid item xs={12} className={classes.mobileMenuHeader}>
                    <Grid item xs={6} className={classes.mobileMenuHeaderTitle}>
                        <Typography variant="h6">{logo}</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.mobileMenuHeaderCloseButton}>
                        <Button onClick={handleMobileMenuClose}>
                            <Typography variant="h6">X</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.mobileMenuHeaderDivider}>
                    <Divider />
                </Grid>
                <Grid item xs={12} className={classes.mobileMenuContent}>
                    <Grid item xs={12} className={classes.mobileMenuItemsHeader}>
                        <Grid item xs={12}>
                            <Typography variant="h6">{headerMenu.techTitle}</Typography>
                        </Grid>
                        {techList.map((tech, index) => (
                            <Grid
                                item
                                xs={12}
                                key={`tech-${index}`}
                                className={classes.mobileMenuItemsItems}>
                                <Box className={classes.menuIcon}>
                                    <Image
                                        src={`/icons/${tech.icon}`}
                                        alt={tech.title}
                                        width={25}
                                        height={25}
                                    />
                                </Box>
                                <Link href={tech.link}>
                                    <a>{tech.title}</a>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={12} className={classes.mobileMenuFooter}>
                        <Grid item xs={12} className={classes.mobileMenuHeaderDivider}>
                            <Divider />
                        </Grid>
                        <Grid className={classes.mobileMenuContactUs}>
                            <strong>{headerMenu.contactUsTitle}</strong>
                            <Typography variant="subtitle1">
                                <a href={'mailto:' + headerMenu.contactUsEmail}>{contactEmail}</a>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fade>
    );

    const renderMobileDesktop = (
        <Modal
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            className={classes.mobileMenu}
            disableScrollLock={true}>
            {body}
        </Modal>
    );

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
            {techList.map((tech, index) => (
                <MenuItem key={`tech-${index}`}>
                    <Box className={classes.menuIcon}>
                        <Image
                            src={`/icons/${tech.icon}`}
                            alt={tech.title}
                            width={25}
                            height={25}
                        />
                    </Box>
                    <Link href={tech.link}>
                        <a>{tech.title}</a>
                    </Link>
                </MenuItem>
            ))}
            <MenuItem className={classes.menuContactUs}>
                <strong>{headerMenu.contactUsTitle}</strong>
            </MenuItem>
            <MenuItem>
                <a href={'mailto:' + contactEmail}>{contactEmail}</a>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.innerHeader}>
                    <Grid item xs={6}>
                        <Link href="/">
                            <a>
                                <Typography variant="h6">{logo}</Typography>
                            </a>
                        </Link>
                    </Grid>
                    <Grid item xs={6} className={classes.menuArea}>
                        {!matches ? (
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMobileMenuOpen}>
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <Box className={classes.menuDesktopIcon}>
                                <Button
                                    endIcon={<MenuIcon />}
                                    onClick={handleDesktopMenuOpen}
                                    className={classes.menuButton}>
                                    {headerMenu.menuTitle}
                                </Button>
                            </Box>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMenuDesktop}
            {renderMobileDesktop}
        </div>
    );
};

export default Header;
