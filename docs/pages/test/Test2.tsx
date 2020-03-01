import * as React from 'react';
import ToolTip from '../../../components/toolTip/ToolTip';
import '../../../components/toolTip/style';
import './test2.less';
import Select from '../../../components/select';
import '../../../components/select/style';
import PopOver from '../../../components/popOver';
import '../../../components/popOver/style';
import Button from '../../../components/button/Button';
import '../../../components/button/style';
import '../../../components/panel/style';
import Input from '../../../components/input/Input';
import Slider from '../../../components/slider';
import '../../../components/slider/style';
import '../../../components/input/style';
import '../../../components/form/style';
import '../../../components/upload/style';
import IndexPage from '../form';
import FullScreen from '../../../components/panel/FullScreen';

const { Option } = Select;

interface BaseProps {

}

export type Test2Props = {} & BaseProps;

class Test2 extends React.Component<Test2Props, any> {
  static propTypes = {};
  state = {
    value: ['1', '2', '4'],
    progress: 0.2,
  };
  popRef: React.RefObject<PopOver> = React.createRef();

  handleProgressChange = (p: number, v: number) => {
    this.setState({
      progress: p,
    });
  };

  handleChange(value: string) {
    console.log('change', value);
    this.setState({ value });
  }

  handleInputChange(value: string) {
    console.log(value);
  }

  closePop = () => {
    if (this.popRef.current) {
      this.popRef.current.hide();
    }
  };

  render() {
    const { progress } = this.state;
    const title = '能共你沿途来爬天梯,黑夜亦亮丽，于山头同盟洪海中发誓,留住你旁人如何话过不可一世,问我亦无愧,有你可拆破这天际';
    return (
      <div style={{ padding: 20 }}>
        <ToolTip title={title}>
          <span className='tip-test'>test2</span>
        </ToolTip>
        <hr />
        <Select disabled value={this.state.value} multiple={false} onChange={this.handleChange.bind(this)}>
          <Option key='1'>一个也不能少1</Option>
          <Option key='2'>一个也不能少2</Option>
          <Option key='3'>一个也不能少3</Option>
          <Option key='4'>一个也不能少4</Option>
          <Option key='5'>一个也不能少5</Option>
          <Option key='6'>一个也不能少6</Option>
          <Option key='7'>一个也不能少7</Option>
        </Select>
        <hr />
        <PopOver content={<div style={{ width: 400, height: 200 }}>wind</div>}>
          <Button status='success-pure'>出现</Button>
        </PopOver>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <div>
            <PopOver trigger='hover' dir='tr' ref={this.popRef} content={<div style={{ width: 400, height: 200 }}>
              <div>一个也不能少</div>
              <Button status={'pure'} style={{ padding: '0 10px' }} onClick={this.closePop}>关闭</Button>
            </div>}>
              <Button style={{ padding: '0 10px' }}>出现2</Button>
            </PopOver>
          </div>
        </div>
        <hr />
        <div>
          <Input status='error' value='李克勤' onChange={this.handleInputChange} placeholder='一个也不能少' />
          <hr />
          <Input status='warning' defaultValue='李克勤' onChange={this.handleInputChange} placeholder='一个也不能少' />
          <hr />
          <Input status='success' defaultValue='李克勤' disabled onChange={this.handleInputChange} placeholder='一个也不能少' />
        </div>
        <hr />
        <Slider onChange={this.handleProgressChange} max={100} progress={progress} />
        <hr />
        <FullScreen>
          <IndexPage from={'wind'} />
        </FullScreen>
        <hr />
        <div>
        </div>
      </div>
    );
  }
}

export default Test2;
