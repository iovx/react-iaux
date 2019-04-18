import * as React from "react";
import "../dist/react-iaux.css"
import * as marked from 'marked';
import {getRandColor, Loading, Header, List, Panel, Card, ProgressBar, Slider, Button} from "react-iaux";
import {getDocsList} from "./docs";
import {Dialog} from "../components";

const {PicDesc: PicDescItem} = List;
const {Wrapper} = Panel;
const {Left: HeaderLeft, Logo: HeaderLogo, Right: HeaderRight} = Header;
const {ImageCard} = Card;

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
    bg: getRandColor(),
    show:false,
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
        <div style={{padding: 10}}>
          <Wrapper style={{height: 200, width: '100%', background: '#fefefe', border: '1px solid #ddd'}}>
            This is Header!
            <ProgressBar tip='none' total={100} progress={77}/>
            <Slider max={100} progress={77}/>
            <Loading text="加载中..."/>
          </Wrapper>
          <Wrapper>
            <ImageCard style={{height: 400}} title="一个也不能少" picUrl={"/entry.jpg"}/>
          </Wrapper>
          <Wrapper>
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
          </Wrapper>
          <Wrapper>
            <Loading text="加载中..." mask={false}/>
            <MarkDown content={docs.getStarted} renderer={markdownRender}/>
            <MarkDown content={docs.example} renderer={markdownRender}/>
          </Wrapper>
          <Dialog visible={this.state.show}>
            <div>一个也不能少</div>
          </Dialog>
          <Button onClick={()=>{this.setState({show:true})}}>SHOW</Button>
        </div>
      </div>
    );
  }
}

export default App;
