import * as React from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-time-picker/dist/TimePicker.css';
import './Test4.less';

interface BaseProps {

}

export type Test2Props = {} & BaseProps;

class Test2 extends React.Component<Test2Props, any> {
  static propTypes = {};
  state = {
    date: new Date(),
  };

  onChange = (date: Date) => this.setState({ date });

  render() {
    return (
      <div style={{ padding: 20}}>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default Test2;
