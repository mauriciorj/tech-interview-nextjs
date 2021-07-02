import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Grid,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { questionCardModel } from './model';
import { theme as themeGlobal } from '../../styles/theme';

interface PropsStyle {
    backgroundColor: string;
    color: string;
}

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: '30px',
        paddingTop: '10px',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    cardHeader: {
        paddingBottom: '5px',
        borderBottom: '1px solid',
        display: 'flex'
    },
    cardTitle: {
        color: theme.palette.themeGrey.main
    },
    cardChipSession: {
        marginTop: '-5px',
        textAlign: 'right'
    },
    cardChip: (chipColor: PropsStyle) => ({
        backgroundColor: chipColor.backgroundColor,
        color: chipColor.color,
    } as any),
    cardChipBasic: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.white.main
    },
    cardChipIntermediate: {
        backgroundColor: theme.palette.green.main,
        color: theme.palette.white.main
    },
    cardChipAdvanced: {
        backgroundColor: theme.palette.red.main,
        color: theme.palette.white.main
    },
    Accordion: {
        marginTop: '10px',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderTop: 0
        }
    }
}));

const QuestionCard = ({answer, id, level, question}: questionCardModel) => {

    let chipColor;

    if (level === 'basic') {
        chipColor = {
            backgroundColor: themeGlobal.palette.primary.main,
            color: themeGlobal.palette.white.main
        };
    } else if (level === 'intermediate') {
        chipColor = {
            backgroundColor: themeGlobal.palette.green.main,
            color: themeGlobal.palette.white.main
        };
    } else {
        chipColor = {
            backgroundColor: themeGlobal.palette.red.main,
            color: themeGlobal.palette.white.main
        };
    }

    const classes = useStyles(chipColor);

    return (
        <Paper className={classes.card} key={id} elevation={3}>
            <Grid item xs={12} className={classes.cardHeader}>
                <Grid item xs={8}>
                    <Typography variant="subtitle1" className={classes.cardTitle}>
                        <strong>Question:</strong> {question}
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.cardChipSession}>
                    <Chip label={level} className={classes.cardChip} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Accordion className={classes.Accordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant="subtitle1">
                            <strong>Answer</strong>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Paper>
    );
};
export default QuestionCard;
