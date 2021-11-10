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
import { theme as themeGlobal } from '../../styles/theme';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

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
    cardChip: (chipColor: PropsStyle) => ({
        backgroundColor: chipColor.backgroundColor,
        color: chipColor.color
    }),
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

export interface Props {
    answer: string;
    id: string;
    level: string;
    question: string;
    accordionOpen?: boolean;
}

const QuestionCard: React.FC<Props> = ({ answer, id, level, question, accordionOpen }) => {
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

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const handlerAccordion = () => {
        setIsAccordionOpen(true);
    };

    const handlerCloseAccordion = () => {
        setIsAccordionOpen(false);
    };

    useEffect(() => {
        if (accordionOpen) {
            setIsAccordionOpen(true);
        }
    }, [accordionOpen]);

    function transform(node: { type: string; name: string; children: HTMLElement[] }) {
        if (node.type === 'tag' && node.name === 'pre') {
            return (
                <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    wrapLines={true}
                    wrapLongLines={true}
                    key={`${uuidv4()}`}>
                    {processNodes(node.children, transform)}
                </SyntaxHighlighter>
            );
        }
    }

    const options = {
        decodeEntities: true,
        transform
    };

    return (
        <Paper className={classes.card} key={id} elevation={1}>
            <Grid item xs={12} className={classes.cardHeader}>
                <Grid item xs={8} className={classes.cardTitle}>
                    {ReactHtmlParser(question)}
                </Grid>
                <Grid item xs={4} className={classes.cardChipSession}>
                    <Chip label={level} className={classes.cardChip} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Accordion
                    className={classes.Accordion}
                    onChange={handlerAccordion}
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
                    <Fade in={true} timeout={600}>
                        <AccordionDetails className={classes.AccordionDetailsSession}>
                            <Box>
                                <Box className={classes.AccordionDetailsTitle}>
                                    <Typography component={'span'}>
                                        {ReactHtmlParser(answer, options)}
                                    </Typography>
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
