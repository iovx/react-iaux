import * as React from "react";
import "../dist/react-iaux.css"
import * as marked from 'marked';
import code from './source';
import {getRandColor} from "react-iaux";
import {getDocsList} from "./docs";

const highlight = require('highlight.js');
// require('highlight.js/styles/androidstudio.css');
// require('highlight.js/styles/ocean.css');
// require('highlight.js/styles/docco.css');
// require('highlight.js/styles/docco.css');
require('highlight.js/styles/googlecode.css');
// require('highlight.js/styles/tomorrow.css');
// require('highlight.js/styles/xcode.css');


interface BaseProps {
}

type AppProps = {} & BaseProps;

const markdownRender = new marked.Renderer();
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return '<div class="hljs iw-code">' + highlight.highlightAuto(code).value + '</div>';
  }
})

interface MarkDownProps {
  content?: string;
  renderer?: marked.Renderer;
}

const docs = getDocsList();
const MarkDown = (props: MarkDownProps) => {
  const {content, renderer} = props;
  return (
    <div className='markdown-body markdown'>
      <div dangerouslySetInnerHTML={{__html: marked(content, {renderer})}}/>
    </div>
  )
}

class App extends React.PureComponent<AppProps, {}> {
  static propTypes = {};
  state = {
    bg: getRandColor()
  };

  render() {
    return (
      <div>
        <MarkDown content={docs.getStarted} renderer={markdownRender}/>
        <MarkDown content={docs.example} renderer={markdownRender}/>
      </div>
    );
  }
}

export default App;
