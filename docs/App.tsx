import * as React from "react";
import "../dist/react-iaux.css"
import * as marked from 'marked';
import code from './source';

import {getRandColor, CurrentTime, Input} from "react-iaux";

const highlight = require('highlight.js');
// require('highlight.js/styles/androidstudio.css');
// require('highlight.js/styles/ocean.css');
// require('highlight.js/styles/docco.css');
// require('highlight.js/styles/docco.css');
// require('highlight.js/styles/googlecode.css');
// require('highlight.js/styles/tomorrow.css');
require('highlight.js/styles/xcode.css');


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

class App extends React.PureComponent<AppProps, {}> {
  static propTypes = {};
  state = {
    bg: getRandColor()
  };

  render() {
    return (
      <div>
        <div style={{background: this.state.bg}}>
          <CurrentTime format="YYYY-MM-DD HH:mm:ss"/>
        </div>
        <div style={{margin:'10px 0'}}>
          <Input value="搜索其实很简单"/>
        </div>
        <div className='markdown-body markdown'>
          <div dangerouslySetInnerHTML={{__html: marked(code.source, {renderer: markdownRender})}}/>
        </div>
      </div>
    );
  }
}

export default App;
