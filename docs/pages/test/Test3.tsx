import * as React from 'react';
import '../../../components/toolTip/style';
import './test2.less';
import '../../../components/select/style';
import '../../../components/popOver/style';
import '../../../components/button/style';
import '../../../components/input/style';
import '../../../components/form/style';
import '../../../components/dialog/style';
import '../../../components/card/style';
import '../../../components/grid/style';
import '../../../components/layout/style';
import '../../../components/header/style';
import '../../../components/footer/style';
import '../../../components/message/style';
import Card from '../../../components/card/Card';
import ImageCard from '../../../components/card/ImageCard';
import Dialog from '../../../components/dialog/Dialog';
import Button from '../../../components/button/Button';
import ImageGrid from '../../../components/grid/ImageGrid';
import Layout from '../../../components/layout/Layout';
import Header from '../../../components/header/Header';
import HeaderLogo from '../../../components/header/HeaderLogo';
import HeaderRight from '../../../components/header/HeaderRight';
import { Nav } from '../../../components';
import NavItem from '../../../components/nav/NavItem';
import Footer from '../../../components/footer/Footer';
import Message from '../../../components/message';


const dataConfig = {
  dataSource: [
    {
      title: 'wind',
      url: 'https://images.unsplash.com/photo-1553531768-4ce3fb0b07fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'wenwen',
      url: 'https://images.unsplash.com/photo-1553531580-652231dae097?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'wenwen3',
      url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'wind',
      url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'wenwen',
      url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'wenwen3',
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'wenwen',
      url: 'https://images.unsplash.com/photo-1543013309-0d1f4edeb868?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'wenwen3',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'wenwen3',
      url: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
  ],
};
const fields = [
  {
    id: 1001,
    fieldName: 'name',
    label: '姓名',
    value: '李克勤',
  },
  {
    id: 1002,
    fieldName: 'age',
    label: '如果年龄',
    value: 22,
  },
  {
    id: 1003,
    fieldName: 'address',
    label: '地址',
    value: '浙江省宁波市',
  },
  {
    id: 1004,
    fieldName: 'remark',
    label: '备注',
    value: '原来有人扶我有人拦我 也造就我 所有突破 当时如果 通行无阻 怎去铸造今天的我 一起挡雨 各自渡河 路人熟人 同样有恩 少一位也不可！',
  },
];
const group = {
  md: [
    {
      type: 'row',
      children: [
        {
          type: 'col',
          span: 12,
          children: [
            {
              type: 'item',
              fieldId: 1001,
            },
          ],
        },
        {
          type: 'col',
          span: 12,
          children: [
            {
              type: 'item',
              fieldId: 1001,
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      children: [
        {
          type: 'col',
          span: 12,
          children: [
            {
              fieldId: 1003,
              type: 'item',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      children: [
        {
          type: 'col',
          span: 12,
          children: [
            {
              type: 'item',
              fieldId: 1001,
            },
          ],
        },
        {
          type: 'col',
          span: 12,
          children: [
            {
              fieldId: 1002,
              type: 'item',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      children: [
        {
          type: 'col',
          span: 8,
          children: [
            {
              type: 'item',
              fieldId: 1001,
            },
          ],
        },
        {
          type: 'col',
          span: 8,
          children: [
            {
              fieldId: 1002,
              type: 'item',
            },
          ],
        },
        {
          type: 'col',
          span: 8,
          children: [
            {
              fieldId: 1003,
              type: 'item',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      children: [
        {
          type: 'col',
          span: 8,
          children: [
            {
              type: 'item',
              fieldId: 1001,
            },
          ],
        },
        {
          type: 'col',
          span: 8,
          children: [
            {
              fieldId: 1002,
              type: 'item',
            },
          ],
        },
        {
          type: 'col',
          span: 8,
          children: [
            {
              fieldId: 1003,
              type: 'item',
            },
          ],
        },
      ],
    },
  ],
};

const { notice: toast } = Message;

interface BaseProps {

}

export type Test2Props = {} & BaseProps;

class Test2 extends React.Component<Test2Props, any> {
  static propTypes = {};
  state = {
    show: false,
  };

  handleToast = () => {
    toast.success('wind');
    toast.error('wind');
    toast.warning('wind');
    toast.info('wind');
    toast.primary('wind', '原来一个也不能少，李克勤');
  };

  render() {
    const title = '能共你沿途来爬天梯,黑夜亦亮丽，于山头同盟洪海中发誓,留住你旁人如何话过不可一世,问我亦无愧,有你可拆破这天际';
    return (
      <div>

        <Header>
          <HeaderLogo>微风测试</HeaderLogo>
          <HeaderRight>
            <Nav>
              <NavItem>wind</NavItem>
            </Nav>
          </HeaderRight>
        </Header>
        <div style={{ padding: 10 }}>
          <Card header={'天梯'}>
            <div>{title}</div>
          </Card>
          <ImageCard
            style={{ width: 400, height: 240, marginTop: 10 }}
            imageStyle={{ height: 400 }}
            picUrl={'http://static.assure.com/images/docs/desk.jpg'}
            title={title}
          />
          <div style={{ marginTop: 10 }}>
            <Dialog
              title='天梯'
              mask={false}
              visible={this.state.show}
              onClose={() => this.setState({ show: false })}
            >
              <div>一个也不能少</div>
            </Dialog>
            <Button onClick={() => {
              this.setState({ show: true });
            }}>SHOW</Button>
          </div>
          <div style={{ marginTop: 10 }}>
            <ImageGrid dataSource={dataConfig.dataSource} />
          </div>
          <div>
            <Layout fields={fields} layout={group.md} />
          </div>
          <div>
            <Button onClick={this.handleToast}>Toast</Button>
          </div>
        </div>
        <Footer>
          hi
        </Footer>
      </div>

    );
  }
}

export default Test2;
