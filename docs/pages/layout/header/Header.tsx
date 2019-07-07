import * as React from 'react';
import {Input, Header} from 'react-iaux';
import {Link} from 'react-router-dom';
import './Header.less';

const {Left: HeaderLeft, Logo: HeaderLogo, Right: HeaderRight} = Header;

interface BaseProps {

}

type HeaderLayoutProps = {} & BaseProps;

class HeaderLayout extends React.PureComponent<HeaderLayoutProps, {}> {
  static propTypes = {};

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Header className="dc-header">
        <HeaderLeft>
          <HeaderLogo>
            <Link to='/'>微风平台UI</Link>
          </HeaderLogo>
        </HeaderLeft>
        <HeaderRight>
          <div className="dc-right-container">
            <div className="search">
              <Input type="text" placeholder="搜索其实很简单"/>
              <span className='btn'><i className="iconfont iconsousuo"/></span>
            </div>
            <div>关于 | 开放平台</div>
          </div>
        </HeaderRight>
      </Header>
    );
  }
}

export default HeaderLayout;
