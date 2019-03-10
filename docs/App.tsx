import * as React from "react";
import { getRandColor, CurrentTime } from "react-iaux";

interface BaseProps {}

type AppProps = {} & BaseProps;

class App extends React.PureComponent<AppProps, {}> {
  static propTypes = {};
  state = {
    bg: getRandColor()
  };
  render() {
    return (
      <div style={{ background: this.state.bg }}>
        <CurrentTime format="YYYY-MM-DD HH:mm:ss" />
      </div>
    );
  }
}

export default App;
