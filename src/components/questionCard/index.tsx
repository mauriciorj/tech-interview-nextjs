import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Grid,
    Fade,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { questionCardModel } from './model';
import { theme as themeGlobal } from '../../styles/theme';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ReactHtmlParser, { processNodes } from 'react-html-parser';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface PropsStyle {
    backgroundColor: string;
    color: string;
}

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: '30px',
        paddingTop: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        '&:hover': {
            boxShadow:
                '2px 4px 3px 1px rgb(0 0 0 / 20%), 2px 3px 4px 2px rgb(0 0 0 / 14%), 2px 3px 5px 2px rgb(0 0 0 / 12%)'
        }
    },
    cardHeader: {
        paddingBottom: '5px',
        borderBottom: '1px solid',
        display: 'flex'
    },
    cardTitle: {
        '& code:*': {
            background: theme.palette.themeGrey.dark,
            borderRadius: '3px',
            padding: '3px'
        }
    },
    cardChipSession: {
        marginTop: '-5px',
        textAlign: 'right'
    },
    cardChip: (chipColor: PropsStyle) =>
        ({
            backgroundColor: chipColor.backgroundColor,
            color: chipColor.color
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
    },
    buttonCardClosed: {
        backgroundColor: theme.palette.blue.light,
        color: theme.palette.white.main,
        '&:hover': {
            backgroundColor: theme.palette.blue.dark
        }
    },
    buttonCardOpened: {
        backgroundColor: theme.palette.blue.dark,
        color: theme.palette.white.main,
        '&:hover': {
            backgroundColor: theme.palette.blue.light
        }
    },
    AccordionDetailsSession: {
        display: 'flex',
        flexDirection: 'column'
    },
    AccordionDetailsTitle: {
        width: '100%',
        marginBottom: '15px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px',
            marginTop: '0px'
        },
        marginLeft: '15px',
        marginTop: '10px',
        '& pre:*': {
            margin: '0px',
            padding: '0px'
        }
    },
    AccordionDetailsButton: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));

const QuestionCard = ({ answer, id, level, question }: questionCardModel) => {
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

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const handlerAccordion = (event: any, expanded: any) => {
        setIsAccordionOpen(expanded);
    };

    const handlerCloseAccordion = () => {
        setIsAccordionOpen(false);
    };

    function transform(node: { type: string; name: string; children: any[] }, index: any) {
        if (node.type === 'tag' && node.name === 'code') {
            return (
                <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    wrapLines={true}
                    wrapLongLines={true}>
                    {processNodes(node.children, transform)}
                </SyntaxHighlighter>
            );
        }
    }

    const options = {
        transform
    };

    return (
        <Paper className={classes.card} key={id} elevation={1}>
            <Grid item xs={12} className={classes.cardHeader}>
                <Grid item xs={8} className={classes.cardTitle}>
                    <strong>Question:</strong> {ReactHtmlParser(question)}
                </Grid>
                <Grid item xs={4} className={classes.cardChipSession}>
                    <Chip label={level} className={classes.cardChip} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Accordion
                    className={classes.Accordion}
                    onChange={(event: any, expanded: any) => handlerAccordion(event, expanded)}
                    expanded={isAccordionOpen}>
                    {!isAccordionOpen && (
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            {!isAccordionOpen && (
                                <Button variant="contained" className={classes.buttonCardClosed}>
                                    See the answer
                                </Button>
                            )}
                        </AccordionSummary>
                    )}
                    <Fade in={isAccordionOpen} timeout={600}>
                        <AccordionDetails className={classes.AccordionDetailsSession}>
                            <Box>
                                <Box className={classes.AccordionDetailsTitle}>
                                    <Typography>{ReactHtmlParser(answer, options)}</Typography>
                                </Box>
                                <Box className={classes.AccordionDetailsButton}>
                                    {isAccordionOpen && (
                                        <>
                                            <Button
                                                variant="contained"
                                                className={classes.buttonCardOpened}
                                                onClick={handlerCloseAccordion}>
                                                Close the answer
                                            </Button>
                                            <ExpandLessIcon onClick={handlerCloseAccordion} />
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Fade>
                </Accordion>
            </Grid>
        </Paper>
    );
};
export default QuestionCard;
