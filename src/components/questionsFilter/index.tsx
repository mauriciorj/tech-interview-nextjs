import React, { useState } from 'react';
import {
    Button,
    Divider,
    Fade,
    FormControl,
    Grid,
    makeStyles,
    Modal,
    NativeSelect,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import TuneIcon from '@material-ui/icons/Tune';
import LevelButton from './levelButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    filterBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    filterTitle: {
        display: 'flex',
        alignContent: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
        color: theme.palette.primary.main
    },
    filterTitleText: {
        marginLeft: '10px'
    },
    filterOptions: {
        display: 'flex'
    },
    questionsPerPage: {
        display: 'flex',
        alignItems: 'center'
    },
    questionsPerPageTitle: {
        paddingRight: '10px'
    },
    formControl: {
        minWidth: 50,
        textAlign: 'center'
    },
    divider: {
        background: theme.palette.themeGrey.dark,
        marginLeft: '10px'
    },
    questionsLevel: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px'
    },
    filterMobileButton: {
        marginTop: '10px',
        color: theme.palette.primary.main
    },
    filterMobileModal: {
        width: '100%',
        height: '100%',
        background: theme.palette.white.main,
        position: 'absolute'
    },
    filterMobileModalTitle: {
        display: 'flex',
        marginLeft: '20px',
        marginTop: '20px',
        alignItems: 'center',
        color: theme.palette.primary.main
    },
    filterMobileModalTitleText: {
        marginLeft: '10px'
    },
    filterMobileModalDivider: {
        margin: '20px'
    },
    filterMobileModalPerPage: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px'
    },
    filterMobileModalPerPageForm: {
        marginLeft: '10px'
    },
    filterMobileModalLevels: {
        marginLeft: '20px',
        marginTop: '20px'
    },
    filterMobileModalLevelsTitle: {
        marginBottom: '10px'
    },
    filterMobileModalTotalQuestions: {
        marginTop: '40px',
        textAlign: 'center'
    },
    filterMobileModalTotalQuestionsButtonText: {
        color: theme.palette.themeGrey.dark
    },
    filterMobileModalCloseButton: {
        position: 'fixed',
        left: '50%',
        bottom: '20px',
        transform: 'translate(-50%, -50%)',
        margin: '0 auto'
    }
}));

export interface Props {
    onClick: (label: string) => void;
    questionsPerPage: number;
    handleChangeQuestionsPerPage: (e: string) => void;
    questionsLevels: { [key: string]: boolean };
    totalQuestions: number | null;
}

const QuestionsFilter: React.FC<Props> = ({
    onClick,
    questionsPerPage,
    handleChangeQuestionsPerPage,
    questionsLevels,
    totalQuestions
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<true | false>(false);

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };

    const handleMobileMenuOpen = () => {
        setIsMobileMenuOpen(true);
    };

    const body = (
        <Fade in={isMobileMenuOpen}>
            <Grid item xs={12} className={classes.filterMobileModal}>
                <Grid item xs={12} className={classes.filterMobileModalTitle}>
                    <TuneIcon />{' '}
                    <Typography variant="h5" className={classes.filterMobileModalTitleText}>
                        Filter
                    </Typography>
                </Grid>
                <Divider className={classes.filterMobileModalDivider} />
                <Grid item xs={12} className={classes.filterMobileModalPerPage}>
                    <Typography>Questions per page:</Typography>
                    <FormControl className={classes.filterMobileModalPerPageForm}>
                        <NativeSelect
                            id="simple-select-outlined"
                            value={questionsPerPage}
                            onChange={(e) => handleChangeQuestionsPerPage(e.target.value)}
                            inputProps={{ 'aria-label': 'questions per page' }}>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.filterMobileModalLevels}>
                    <Grid item xs={12}>
                        <Typography className={classes.filterMobileModalLevelsTitle}>
                            Levels:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {Object.keys(questionsLevels).map((level: string) => (
                            <LevelButton
                                label={level}
                                state={questionsLevels[level as string]}
                                key={level}
                                onClick={onClick}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.filterMobileModalTotalQuestions}>
                    <Button
                        variant="outlined"
                        disabled
                        style={{ border: `solid 1px ${theme.palette.themeGrey.dark}` }}>
                        <Typography className={classes.filterMobileModalTotalQuestionsButtonText}>
                            <strong>Total Questions:</strong> {totalQuestions}
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.filterMobileModalCloseButton}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloseIcon />}
                        onClick={handleMobileMenuClose}>
                        <Typography>Close Filter</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Fade>
    );

    const renderMobileFilter = (
        <Modal open={isMobileMenuOpen} onClose={handleMobileMenuClose} disableScrollLock={true}>
            {body}
        </Modal>
    );

    return (
        <Grid item xs={12} className={classes.filterBox}>
            {matches ? (
                <>
                    <Grid item xs={12} className={classes.filterTitle}>
                        <TuneIcon />
                        <Typography className={classes.filterTitleText}>Filter</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.filterOptions}>
                        <Grid className={classes.questionsPerPage}>
                            <Typography className={classes.questionsPerPageTitle}>
                                Questions per page:
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    id="simple-select-outlined"
                                    value={questionsPerPage}
                                    onChange={(e) => handleChangeQuestionsPerPage(e.target.value)}
                                    inputProps={{ 'aria-label': 'questions per page' }}>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Divider orientation="vertical" flexItem className={classes.divider} />
                        <Grid className={classes.questionsLevel}>
                            <Typography className={classes.questionsPerPageTitle}>
                                Levels:
                            </Typography>
                            {Object.keys(questionsLevels).map((level: string) => (
                                <LevelButton
                                    label={level}
                                    state={questionsLevels[level as string]}
                                    key={level}
                                    onClick={onClick}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Button className={classes.filterMobileButton} onClick={handleMobileMenuOpen}>
                    <TuneIcon />
                    <Typography className={classes.filterTitleText}>Filter</Typography>
                </Button>
            )}
            {renderMobileFilter}
        </Grid>
    );
};

export default QuestionsFilter;
