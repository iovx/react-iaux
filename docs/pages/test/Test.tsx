import * as React from 'react';
import * as PropTypes from 'prop-types';
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

export interface BaseProps {

}

export type TestProps = {} & BaseProps;


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

  render() {
    return (
      <div>
        <div>是否开启配置:</div>
        <CheckBox defaultChecked label='是否开启配置' />
        <div>实现方式:</div>
        <Radio defaultChecked label='实现方式' />
        <Radio disabled label='自定义' />
        <div>请选出你熟悉的语言:</div>
        <CheckBox.Group
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
        <Alert closable onClose={this.handleClose}>
          原来一个也不能少！
        </Alert>
        <Alert type='success'>
          原来一个也不能少！
        </Alert>
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
          <Pagination total={100} />
        </div>
      </div>
    );
  }
}

export default Test;
