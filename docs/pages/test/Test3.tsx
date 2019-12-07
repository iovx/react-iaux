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
import Card from '../../../components/card/Card';
import ImageCard from '../../../components/card/ImageCard';
import Dialog from '../../../components/dialog/Dialog';
import Button from '../../../components/button/Button';


interface BaseProps {

}

export type Test2Props = {} & BaseProps;

class Test2 extends React.Component<Test2Props, any> {
  static propTypes = {};
  state = {
    show: false,
  };


  render() {
    const title = '能共你沿途来爬天梯,黑夜亦亮丽，于山头同盟洪海中发誓,留住你旁人如何话过不可一世,问我亦无愧,有你可拆破这天际';
    return (
      <div style={{ margin: 20 }}>
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
            visible={this.state.show}
            onClose={() => this.setState({ show: false })}
          >
            <div>一个也不能少</div>
          </Dialog>
          <Button onClick={() => {
            this.setState({ show: true });
          }}>SHOW</Button>
        </div>
      </div>

    );
  }
}

export default Test2;
