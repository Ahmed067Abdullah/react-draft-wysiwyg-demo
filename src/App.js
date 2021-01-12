import React, { useEffect, useState } from 'react';
import './App.css';
import { Editor } from 'react-draft-wysiwyg';
import {
  convertToRaw,
  EditorState,
  convertFromRaw,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';

const he = require('he')

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const content = localStorage.getItem("blog");
    if (content) {
      try {
        const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(he.decode(content))))
        setEditorState(editorState)
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  return (
    <div>
      <button
        className="btn"
        style={{ 'right': 80 }}
        onClick={() => {
          const conent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
          localStorage.setItem("blog", conent);
        }}>Save
      </button>
      <button
        className="btn"
        style={{ 'right': 20 }}
        onClick={() => {
          localStorage.removeItem("blog");
          setEditorState(EditorState.createEmpty());
        }}>Clear
      </button>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
        toolbarStyle={{
          'position': 'fixed',
          'top': 0,
          'left': 0,
          'zIndex': '2'
        }}
        editorStyle={{
          marginTop: 50
        }}
      />
      {/* To render the created blog */}
      {/* <div dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState.getCurrentContent()))}}>
    </div> */}
    </div >
  );
}

export default App;
