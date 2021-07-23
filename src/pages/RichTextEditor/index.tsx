import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const Editor = dynamic<any>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
    ssr: false
});

const ControlledEditor: React.FC = () => {
    const [editorStateControl, setEditorStateControl] = useState<any>({
        editorState: EditorState.createEmpty()
    });

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const onEditorStateChange = (editorState: any) => {
        setEditorStateControl({
            editorState
        });
    };

    const { editorState } = editorStateControl;

    const wrapperStyle = {
        border: '1px solid #969696'
    };

    const editorStyle = {
        height: '10rem',
        padding: '1rem'
    };

    return (
        <div style={{ width: '70%', marginTop: '20px', marginLeft: '20px' }}>
            <h1>Rich Text Editor - v1</h1>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                initialEditorState={editorState}
                wrapperClassName="demo-wrapper"
                wrapperStyle={wrapperStyle}
                editorStyle={editorStyle}
                editorClassName="demo-editor"
            />
            <h3 style={{ marginTop: '30px' }}>Preview</h3>
            <textarea
                style={{ width: '100%', minHeight: '200px' }}
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>
    );
};

export default ControlledEditor;
