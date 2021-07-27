import React, { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Fade,
    Grid,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core';
import { translations } from '../../translations';
import FormValidation from '../../utils/formValidation';

const useStyles = makeStyles((theme) => ({
    sessionTitle: {
        textAlign: 'center',
        marginTop: '40px',
        marginBottom: '40px',
        color: theme.palette.themeGrey.dark
    },
    title: {
        marginBottom: '10px'
    },
    subTitle: {
        color: theme.palette.primary.main,
        fontStyle: 'italic'
    },
    formSession: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formSubSession: {
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        width: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
        '& .MuiFormLabel-root': {
            fontSize: '1.5rem',
            top: '-10px'
        },
        '& .MuiInput-input': {
            fontSize: '1.3rem',
            top: '-10px'
        }
    },
    textField: {
        width: '100%',
        textAlign: 'center'
    },
    inputError: {
        color: theme.palette.red.main,
        marginBottom: '10px',
        marginLeft: '10px'
    },
    button: {
        marginTop: '10px',
        marginLeft: '10px'
    },
    loadingIcon: {
        marginLeft: '10px',
        color: theme.palette.white.main
    },
    formSent: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '40px'
    },
    emoji: {
        fontSize: '2rem',
        paddingRight: '10px'
    }
}));

const StayTuned: React.FC = () => {
    const classes = useStyles();

    const [formInput, setFormInput] = useState('');
    const [formError, setFormError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormSent, setIsFormSent] = useState(false);

    const {
        en: { stayTuned }
    } = translations;

    const submitHanlder = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsLoading(true);
        const isValid = FormValidation(formInput, 'email', 2, 50);
        if (!isValid) {
            setIsLoading(false);
            return setFormError(true);
        }
        const res = await fetch('/api/subscribe', {
            body: JSON.stringify({
                email: formInput
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        if (res.status !== 200) {
            return setFormError(true);
        }
        setIsFormSent(true);
        return setIsLoading(false);
    };

    const Emoji = (props: {
        label?: string;
        symbol: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
    }) => (
        <span
            role="img"
            className={classes.emoji}
            aria-label={props.label ? props.label : ''}
            aria-hidden={props.label ? 'false' : 'true'}>
            {props.symbol}
        </span>
    );

    return (
        <>
            <Box className={classes.sessionTitle}>
                <Typography variant="h4" className={classes.title}>
                    {stayTuned.title}
                </Typography>
                <Typography variant="h5" className={classes.subTitle}>
                    {stayTuned.subTitle}
                </Typography>
            </Box>
            <Grid item xs={12} className={classes.formSession}>
                {!isFormSent ? (
                    <Grid item xs={12} md={6} className={classes.formSubSession}>
                        <form
                            noValidate
                            autoComplete="off"
                            className={classes.form}
                            onSubmit={submitHanlder}>
                            <TextField
                                id="stayTuned"
                                label={stayTuned.inputFieldText}
                                className={classes.textField}
                                value={formInput}
                                onChange={(e) => {
                                    setFormError(false);
                                    setFormInput(e.target.value);
                                }}
                            />
                            {formError && (
                                <Typography variant="subtitle2" className={classes.inputError}>
                                    {stayTuned.inputError}
                                </Typography>
                            )}
                            <Box className={classes.button}>
                                <Button variant="contained" color="primary" onClick={submitHanlder}>
                                    <Typography variant="subtitle1">
                                        {stayTuned.buttonLabel}
                                    </Typography>
                                    {isLoading && (
                                        <CircularProgress
                                            size={20}
                                            className={classes.loadingIcon}
                                        />
                                    )}
                                </Button>
                            </Box>
                        </form>
                    </Grid>
                ) : (
                    <Fade in={true} timeout={700}>
                        <Grid item xs={12} md={6} className={classes.formSent}>
                            <Typography variant="h6">
                                <Emoji symbol="🎉" /> {stayTuned.formSent}
                            </Typography>
                        </Grid>
                    </Fade>
                )}
            </Grid>
        </>
    );
};

export default StayTuned;
