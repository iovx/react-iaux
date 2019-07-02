import * as React from "react";
import * as marked from 'marked';
import * as hljs from 'highlight.js';

require('highlight.js/styles/googlecode.css');

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
    return '<div class="hljs iw-code">' + hljs.highlightAuto(code).value + '</div>';
  }
})

interface MarkDownProps {
  content?: string;
}

const MarkDown = (props: MarkDownProps) => {
  const {content} = props;
  return (
    <div className='markdown-body markdown' >
      <div dangerouslySetInnerHTML={{__html: marked(content, {renderer: markdownRender})}} />
    </div >
  )
}

export default MarkDown;
