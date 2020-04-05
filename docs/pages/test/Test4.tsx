import * as React from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-time-picker/dist/TimePicker.css';
import './Test4.less';
import Upload from '../../../components/upload/Upload';
import Button from '../../../components/button';
import '../../../components/upload/style';
import '../../../components/button/style';

interface BaseProps {

}

export type Test2Props = {} & BaseProps;

class Test2 extends React.Component<Test2Props, any> {
  static propTypes = {};
  ref = React.createRef<Upload>();
  state = {
    date: new Date(),
  };

  onChange = (date: Date) => this.setState({ date });
  handleClick = () => {
    if (this.ref.current) {
      this.ref.current.truncate();
    }
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
        <Button onClick={this.handleClick}>Empty</Button>
        <Upload ref={this.ref} />
      </div>
    );
  }
}

export default Test2;
