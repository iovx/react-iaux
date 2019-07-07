import * as React from 'react';
import {getDocsList} from '../../docs/docs';
import MarkDown from '../../shared/MarkDown';
import './IntrolPage.less';

class IntroPage extends React.Component {
  static propTypes = {};
  docs: any;

  constructor(props: any) {
    super(props);
    this.docs = getDocsList();
  }
  render() {
    console.log(this.docs);
    return (
      <React.Fragment>
        <MarkDown content={this.docs.getStarted}/>
        <MarkDown content={this.docs.example}/>
      </React.Fragment>
    );
  }
}

export default IntroPage;
