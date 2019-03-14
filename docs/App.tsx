import * as React from "react";
import "../dist/react-iaux.css"
import * as marked from 'marked';
import {getRandColor, Loading, Header, List, Panel} from "react-iaux";
import {getDocsList} from "./docs";

const {Left: HeaderLeft, Logo: HeaderLogo, Right: HeaderRight} = Header;
const {PicDesc: PicDescItem} = List;
const {FullScreen, Wrapper, DragWrapper} = Panel;

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
        <Header>
          <HeaderLeft>
            <HeaderLogo>微风平台</HeaderLogo>
          </HeaderLeft>
          <HeaderRight>
            关于 | 开放平台
          </HeaderRight>
        </Header>
        <DragWrapper>
          <Panel header={<span>今日要点</span>}>
            <PicDescItem
              data={{
                id: "1001",
                title: '微风平台',
                picUrl: '/entry.jpg',
                description: '原来一个也不能少',
                url: '#'
              }}
            />
            <PicDescItem
              align='left'
              data={{
                id: "1001",
                title: '微风平台',
                picUrl: '/entry.jpg',
                description: '原来一个也不能少',
                url: '#'
              }}
            />
            <PicDescItem
              align='right'
              data={{
                id: "1001",
                title: '微风平台',
                picUrl: '/entry.jpg',
                description: '原来一个也不能少',
                url: '#'
              }}
            />
            <PicDescItem
              data={{
                id: "1001",
                title: '微风平台',
                picUrl: '/entry.jpg',
                description: '原来一个也不能少',
                url: '#'
              }}
            />
            <PicDescItem
              align='left'
              data={{
                id: "1001",
                title: '微风平台',
                picUrl: '/entry.jpg',
                description: '原来一个也不能少',
                url: '#'
              }}
            />
            <PicDescItem
              align='right'
              data={{
                id: "1001",
                title: '微风平台',
                picUrl: '/entry.jpg',
                description: '原来一个也不能少',
                url: '#'
              }}
            />
          </Panel>
        </DragWrapper>
        <div style={{height: 200, width: '100%', background: '#eee', border: '1px solid #ddd'}}>
          This is Header!
          <Loading text="拼命加载中..."/>
        </div>
        <Wrapper>
          <Loading text="拼命加载中..." mask={false}/>
          <MarkDown content={docs.getStarted} renderer={markdownRender}/>
          <FullScreen>
            <MarkDown content={docs.example} renderer={markdownRender}/>
          </FullScreen>
        </Wrapper>
      </div>
    );
  }
}

export default App;
