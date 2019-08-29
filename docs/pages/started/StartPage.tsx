import * as React from 'react';
import {Panel, Button} from 'react-iaux';
import {History} from 'history';

const {Wrapper} = Panel;

interface BaseProps {
  history: History;
}

type StartPageProps = {} & BaseProps;

class StartPage extends React.Component<StartPageProps, {}> {
  constructor(props: any) {
    super(props);
    this.handleGetStartClick = this.handleGetStartClick.bind(this);
  }

  handleGetStartClick() {
    this.props.history.push('/getStarted');
  }

  render() {
    return (
      <Wrapper>
        <Wrapper className="dc-intro-wrapper"/>
        <div className="dc-btn-line">
          <Button onClick={this.handleGetStartClick}>Get Started</Button>
        </div>
      </Wrapper>
    );
  }
}

export default StartPage;
