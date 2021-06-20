import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sass/App.scss";
import AceEditor from "react-ace";
import 'highlight.js/styles/monokai.css';

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";

const marked = require('marked');
const hljs = require('highlight.js');


marked.setOptions({
  breaks: true,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

const renderer = new marked.Renderer();

const placeholder = `# **Hello!**

## Want a sub-heading?
### Or something _less_?

\`<div>between 2 backticks you get some code</div>\`

\`\`\`javascript
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

Tables | Neat | As Headers too?
------------ | ------------- | -------------
Divide them | with those | vertical slashes

- This is pretty handy for all sorts of lists, like a shopping list
  - Sub-listing
     - Deeper...
        - Deep enough
        1. How about with numbers?
        1. The numbers add up
1. Though they don't continue after indenting

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

/* dangerouslySetInnerHTML allows the markup, stored as a string, 
to be read exactly as HTML rather than a string with HTML in it */
function Preview({ markdown }) {
  const markup = {
    __html: marked(markdown, { renderer: renderer }),
  };

  return (
    <div 
      dangerouslySetInnerHTML={markup}
      id="preview"
    ></div>
  );
}
 
function App() {
  const [text, setText] = React.useState(placeholder);
  
  return (
    <div className="App">
      <header id="App-header" className="wrapper">
        <div id="title-box">
          <h1 className="display-1" id="title">Markdown Previewer</h1>
        </div>
        <div id="input-output">
          <div id="input-box">
            <h3 className="mt-0 mb-0" id="input-title" style={{ fontWeight: 100 }}>Input</h3>
            <AceEditor
              mode="markdown"
              theme="github"
              name="editor"
              id="editor"
              style={{ width: "100%", height: "700px" }}
              value={text} 
              editorProps={{ $blockScrolling: true }}
              /* For some reason, passing a function (with event as a prop arg) that returns 
              e.target.value passed in setText raises an error whenever an event occurs. 
              Instead, the code must be written inside react-ace's provided onChange prop. 
              This must be an issue with react-ace as React's own onChange event handler doesn't have this issue */
              onChange={value => setText(value)} 
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true
              }}
            />
          </div>
          <div id="output-box">
            <h3 className="mt-0 mb-0" id="output-title" style={{ fontWeight: 100 }}>Output</h3>
            <Preview markdown={text} />
          </div>
        </div>
      </header>
    </div>
  );
}


export default App;
