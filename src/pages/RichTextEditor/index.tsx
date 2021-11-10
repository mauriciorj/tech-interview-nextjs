import React, { useEffect, useState } from 'react';
import { FormControl, Grid, makeStyles, NativeSelect, Typography } from '@material-ui/core';
import { EditorState, convertToRaw, RichUtils } from 'draft-js';
import { convertFromHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import QuestionCard from '../../components/questionCard';
import { v4 as uuidv4 } from 'uuid';
import { questionsDb } from '../../db/questionsDb';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const Editor = dynamic<any>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
    ssr: false
});

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        display: 'flex',
        marginTop: '20px',
        marginLeft: '20px'
    },
    leftDiv: {
        paddingRight: '20px',
        borderRight: '1px solid #333'
    },
    rightDiv: {
        marginLeft: '20px',
        marginRight: '20px'
    },
    techList: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
    },
    questionLevel: {
        display: 'flex',
        alignItems: 'center'
    },
    questionLevelTitle: {
        marginRight: '10px'
    }
}));

const ControlledEditor: React.FC = () => {
    const classes = useStyles();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    // Editor state for question
    const [editorStateControlQuestion, setEditorStateControlQuestion] = useState<any>({
        editorStateQuestion: EditorState.createEmpty()
    });

    // Editor state for answer
    const [editorStateControlAnswer, setEditorStateControlAnswer] = useState<any>({
        editorState: EditorState.createEmpty()
    });

    const [questionId, setQuestionId] = useState<string | null>(null);

    const [questionLevel, setQuestionLevel] = useState<string>('basic');

    const [techList, setTechList] = useState<Array<string>>([]);

    const [techSelected, setTechSelected] = useState<keyof typeof questionsDb.en>('javascript');

    const [lastOrderQuestion, setLastOrderQuestion] = useState<number>(0);

    const [updateTextArea, setUpdateTextArea] = useState('');

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const onEditorStateChangeQuestion = (editorStateQuestion: any) => {
        setEditorStateControlQuestion({
            editorStateQuestion
        });
    };

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const onEditorStateChangeAnswer = (editorState: any) => {
        setEditorStateControlAnswer({
            editorState
        });
    };

    const { editorState } = editorStateControlAnswer;
    const { editorStateQuestion } = editorStateControlQuestion;

    const wrapperStyle = {
        border: '1px solid #969696'
    };

    const editorStyle = {
        height: '10rem',
        paddingLeft: '10px'
    };

    const editorStyleQuestion = {
        maxHeight: '100px',
        paddingLeft: '10px'
    };

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const handleKeyCommandQuestion = (command: any, editorStateQuestion: any) => {
        const newState = RichUtils.handleKeyCommand(editorStateQuestion, command);

        if (newState) {
            onEditorStateChangeQuestion(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const handleKeyCommand = (command: any, editorState: any) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onEditorStateChangeAnswer(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    useEffect(() => {
        const questionId = uuidv4();
        setQuestionId(questionId);

        Object.keys(questionsDb.en).map(function (key, index) {
            if (!techList.includes(key)) {
                setTechList((prevState) => [...prevState, key]);
            }
        });
    }, []);

    useEffect(() => {
        if (!techSelected) {
            setTechSelected(techList[0] as keyof typeof questionsDb.en);
        }
    }, [techList]);

    useEffect(() => {
        if (questionsDb && (techSelected as keyof typeof questionsDb)) {
            const getLastQuestionNumber = questionsDb.en[techSelected];
            let lastOrderQuestion = 0;
            getLastQuestionNumber.map((question: { order: number }) =>
                question.order > lastOrderQuestion ? (lastOrderQuestion = question.order) : null
            );
            setLastOrderQuestion(lastOrderQuestion);
        }
    }, [techSelected]);

    const sanatizeText = (text: string) => {
        return text;
    }

    useEffect(() => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        const textSanatized = sanatizeText(markup);
        setUpdateTextArea(textSanatized);
    }, [editorStateControlAnswer]);

    const functionUpdateEditor = () => {
        onEditorStateChangeAnswer(
            EditorState.push(editorState, convertFromHTML(updateTextArea), 'change-block-data')
        );
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? (
        <Grid item xs={12} className={classes.mainDiv}>
            <Grid item xs={8} className={classes.leftDiv}>
                <h1>Rich Text Editor - v1</h1>
                <Grid item xs={12} className={classes.techList}>
                    <Typography className={classes.questionLevelTitle}>
                        Select technology:
                    </Typography>
                    <FormControl>
                        <NativeSelect
                            id="simple-select-outlined"
                            value={techSelected}
                            onChange={(e) =>
                                setTechSelected(e.target.value as keyof typeof questionsDb.en)
                            }
                            inputProps={{ 'aria-label': 'question level' }}>
                            {techList.map((tech, index) => (
                                <option key={`${tech}-${index}`} value={tech}>
                                    {tech}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.questionLevel}>
                    <Typography className={classes.questionLevelTitle}>Question level:</Typography>
                    <FormControl>
                        <NativeSelect
                            id="simple-select-outlined"
                            value={questionLevel}
                            onChange={(e) => setQuestionLevel(e.target.value)}
                            inputProps={{ 'aria-label': 'question level' }}>
                            <option value="basic">basic</option>
                            <option value="intermediate">intermediate</option>
                            <option value="advanced">advanced</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <h3 style={{ marginTop: '30px' }}>Question</h3>
                <Editor
                    //blockRenderMap={blockRenderMap}
                    editorState={editorStateQuestion}
                    onEditorStateChange={onEditorStateChangeQuestion}
                    handleKeyCommand={handleKeyCommandQuestion}
                    initialEditorState={editorStateQuestion}
                    wrapperStyle={wrapperStyle}
                    editorStyle={editorStyleQuestion}
                    hashtag={{
                        separator: ' ',
                        trigger: '#'
                    }}
                    toolbar={{
                        options: ['inline'],
                        inline: {
                            options: ['bold', 'strikethrough']
                        }
                    }}
                />
                <h3 style={{ marginTop: '30px' }}>Answer</h3>
                <Editor
                    //blockRenderMap={blockRenderMap}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChangeAnswer}
                    handleKeyCommand={handleKeyCommand}
                    initialEditorState={editorState}
                    wrapperClassName="demo-wrapper"
                    wrapperStyle={wrapperStyle}
                    editorStyle={editorStyle}
                    editorClassName="demo-editor"
                />
            </Grid>
            <Grid item xs={4} className={classes.rightDiv}>
                <h3 style={{ marginTop: '30px' }}>Card Preview</h3>
                <QuestionCard
                    answer={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    key="richText-temp-key"
                    id="richText-temp-id"
                    level={questionLevel}
                    question={draftToHtml(convertToRaw(editorStateQuestion.getCurrentContent()))}
                    accordionOpen={true}
                />
                <h3 style={{ marginTop: '30px' }}>
                    ANSWER Html Preview (not editable <i>yet</i>!)
                </h3>
                <textarea
                    style={{ width: '100%', minHeight: '200px' }}
                    value={updateTextArea}
                    onChange={(e) => setUpdateTextArea(e.target.value)}
                    onBlur={functionUpdateEditor}
                />
                <h3 style={{ marginTop: '30px' }}>New question (object format)</h3>
                <Typography>
                    &#123;{<br></br>}
                    &nbsp;&nbsp;id: {questionId}, {<br></br>}
                    &nbsp;&nbsp;order: {lastOrderQuestion + 1}, {<br></br>}
                    &nbsp;&nbsp;question: $
                    {draftToHtml(convertToRaw(editorStateQuestion.getCurrentContent()))},{' '}
                    {<br></br>}
                    &nbsp;&nbsp;answer: $
                    {draftToHtml(convertToRaw(editorState.getCurrentContent()))}, {<br></br>}
                    &nbsp;&nbsp;level: {questionLevel}, {<br></br>}
                    &nbsp;&nbsp;tech: {techSelected}
                    {<br></br>}
                    &#125;
                </Typography>
            </Grid>
        </Grid>
    ) : null;
};

export default ControlledEditor;
