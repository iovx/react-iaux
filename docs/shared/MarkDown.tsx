import * as React from 'react';
import * as marked from 'marked';
import * as hljs from 'highlight.js';
import { Loading } from 'components';

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
  highlight: function(code) {
    return '<div class="hljs iw-code">' + hljs.highlightAuto(code).value + '</div>';
  },
});

type MC = string | Promise<any>;
type IContent = MC | (() => MC);
interface MarkDownProps {
  content?: IContent;
}
interface MarkDownState {
  content: string;
  loading: boolean;
}
class MarkDown extends React.Component<MarkDownProps, MarkDownState> {
  constructor(props: MarkDownProps) {
    super(props);
    this.state = {
      content: '',
      loading: false,
    };
  }
  componentDidMount() {
    const { content } = this.props;
    this.setState(() => {
      Loading: true;
    });
    this.setDoc(content);
  }

  private setDoc(content: IContent) {
    if (typeof content === 'string') {
      this.setState({ content, loading: false });
    } else if (content instanceof Promise) {
      content.then(text => {
        this.setState({ content: text, loading: false });
      });
    } else if (typeof content === 'function') {
      this.setDoc(content());
    }
  }

  render() {
    const {loading, content } = this.state;
    return (
      <div className="markdown-body markdown">
        {loading && <div>Loading....</div>}
        <div dangerouslySetInnerHTML={{ __html: marked(content, { renderer: markdownRender }) }} />
      </div>
    );
  }
}

export default MarkDown;
