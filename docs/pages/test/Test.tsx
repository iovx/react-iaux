import * as React from 'react';
import CheckBox from '../../../components/checkBox';
import '../../../components/checkBox/style';
import Radio from '../../../components/radio';
import '../../../components/radio/style';
import Alert from '../../../components/alert';
import '../../../components/alert/style';
import Pagination from '../../../components/pagination/Pagination';
import Popup from '../../../components/popup';
import '../../../components/popup/style';
import Button from '../../../components/button/Button';
import '../../../components/button/style';
import Tab from '../../../components/tab';
import '../../../components/tab/style';
import CollapsePanel from '../../../components/collapse/CollapsePanel';
import '../../../components/collapse/style';
import '../../../components/card/style';
import '../../../components/pagination/style';

export interface BaseProps {

}

export type TestProps = {} & BaseProps;

const { Panel: TabPanel } = Tab;


class Test extends React.PureComponent<TestProps, {}> {
  static propTypes = {};
  state = {
    showPop: false,
    left: -100,
    top: -100,
  };

  handleClose() {
    console.log('不让关');
    return Promise.resolve(true);
  }

  handleClick = (e) => {
    console.log(e.pageX, e.pageY);
    this.setState({ showPop: true, left: e.pageX, top: e.pageY });
  };
  handleCloseClick = () => {
    this.setState({ showPop: false });
  };

  handleCheckBoxChange = (e) => {
    console.log(e);
  };
  handleRadioChange = (e) => {
    console.log(e);
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <CollapsePanel header={<div className='collapse-panel-holder'>收起</div>} body={
          <div>
            <div>是否开启配置:</div>
            <CheckBox defaultChecked label='是否开启配置'/>
            <div>实现方式:</div>
            <Radio defaultChecked label='实现方式'/>
            <Radio disabled label='自定义'/>
          </div>
        }/>
        <CollapsePanel header={<div className='collapse-panel-holder'>收起2</div>} body={
          <div>
            <div>请选出你熟悉的语言:</div>
            <CheckBox.Group
              onChange={this.handleCheckBoxChange}
              data={[
                {
                  name: 'name',
                  value: 'JavaScript',
                  label: 'JavaScript',
                },
                {
                  name: 'name',
                  value: 'PHP',
                  label: 'PHP',
                },
                {
                  name: 'name',
                  value: 'Java',
                  label: 'Java',
                },
                {
                  name: 'name',
                  value: 'Python',
                  label: 'Python',
                },
              ]}
            />
            <div>请选出你从事的语言:</div>
            <Radio.Group
              onChange={this.handleRadioChange}
              defaultValue={'PHP'}
              data={[
                {
                  name: 'name',
                  value: 'JavaScript',
                  label: 'JavaScript',
                },
                {
                  name: 'name',
                  value: 'PHP',
                  label: 'PHP',
                },
                {
                  name: 'name',
                  value: 'Java',
                  label: 'Java',
                },
                {
                  name: 'name',
                  value: 'Python',
                  label: 'Python',
                },
              ]}
            />
            <div style={{ lineHeight: '34px', color: '#666' }}>你今天带饭了吗？</div>
            <Radio.Group
              data={[
                {
                  name: 'rice',
                  value: '1',
                  label: '带了',
                },
                {
                  name: 'rice',
                  value: '0',
                  label: '没带',
                },
              ]}
            />
          </div>
        }/>
        <Tab style={{ marginTop: 10 }}>
          <TabPanel title='测试一' className='alert-test2'>
            <Alert closable onClose={this.handleClose} className='alert'>
              原来一个也不能少！
            </Alert>
            <Alert type='success' className='alert'>
              原来一个也不能少！
            </Alert>
            <Alert type='error' className='alert'>
              原来一个也不能少！
            </Alert>
            <Alert type='warning' className='alert'>
              原来一个也不能少！
            </Alert>
          </TabPanel>
          <TabPanel title='测试二'>
            <div>
              <Button onClick={this.handleClick}>显示</Button>
              <Button onClick={this.handleCloseClick} status='error'>关闭</Button>
              <Popup top={this.state.top} left={this.state.left} show={this.state.showPop}>
                <Alert type='warning'>
                  原来一个也不能少！
                </Alert>
                <Alert type='error'>
                  原来一个也不能少！
                </Alert>
              </Popup>
            </div>
            <div>
              <Pagination total={100}/>
            </div>
          </TabPanel>
        </Tab>
      </div>
    );
  }
}

export default Test;
