import * as React from "react";
import "../dist/react-iaux.css"
import {Header, Panel} from "react-iaux";
import {getDocsList} from "./docs";
import MarkDown from "./shared/MarkDown";

const {Wrapper} = Panel;
const {Left: HeaderLeft, Logo: HeaderLogo, Right: HeaderRight} = Header;

interface BaseProps {

}

type AppProps = {} & BaseProps;

const docs = getDocsList();

class App extends React.PureComponent<AppProps, {}> {
  static propTypes = {};

  render() {
    return (
      <div >
        <Header >
          <HeaderLeft >
            <HeaderLogo >微风平台</HeaderLogo >
          </HeaderLeft >
          <HeaderRight >
            关于 | 开放平台
          </HeaderRight >
        </Header >
        <div style={{padding: 10}} >
          <Wrapper >
            <MarkDown content={docs.getStarted} />
            <MarkDown content={docs.example} />
          </Wrapper >
        </div >
      </div >
    );
  }
}

export default App;
