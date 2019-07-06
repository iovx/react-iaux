import * as React from 'react';
// import { Header, Panel } from 'react-iaux';
import Header from '../es/header';
import Panel from '../es/panel';

import '../es/header/style';
import '../es/panel/style';

import { getDocsList } from './pages/intro/doc';
import MarkDown from './shared/MarkDown';
import '../dist/react-iaux.css';
import './app.less';

const { Wrapper } = Panel;
const { Left: HeaderLeft, Logo: HeaderLogo, Right: HeaderRight } = Header;

interface BaseProps {}

type AppProps = {} & BaseProps;

class App extends React.PureComponent<AppProps, {}> {
  static propTypes = {};
  docs: any;
  constructor(props: any) {
    super(props);
    this.docs = getDocsList();
  }
  render() {
    return (
      <div>
        <Header>
          <HeaderLeft>
            <HeaderLogo>微风平台</HeaderLogo>
          </HeaderLeft>
          <HeaderRight>关于 | 开放平台</HeaderRight>
        </Header>
        <div style={{ padding: 10 }}>
          <div className="main">Hello</div>
          <Wrapper>
            <MarkDown content={this.docs.getStarted} />
            <MarkDown content={this.docs.example} />
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default App;
