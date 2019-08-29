import * as React from 'react';
import {Footer, Panel} from 'react-iaux';
import {Link} from 'react-router-dom';
import HeaderLayout from './pages/layout/header';
import './app.less';
import {Route, Router, Switch} from 'react-router';
import {History} from 'history';
import MenuList from "./pages/layout/menu/MenuList";

const {Wrapper} = Panel;

const StartPage = React.lazy(() =>
  import(/* webpackChunkName:'page.intro */ './pages/started/StartPage'),
);
const IntroPage = React.lazy(() =>
  import(/* webpackChunkName:'page.intro */ './pages/started/IntroPage'),
);
const ComponentDocs = React.lazy(() =>
  import(/* webpackChunkName:'page.intro */ './pages/started/ComponentDocs'),
);

const LazyHolder = Comp => {
  return props => (
    <React.Suspense fallback={<div>正在加载...</div>}>
      <Comp {...props} />
    </React.Suspense>
  );
};

interface BaseProps {
  history: History;
}

type AppProps = {} & BaseProps;

class App extends React.PureComponent<AppProps, {}> {
  render() {
    return (
      <Wrapper className="dc-root">
        <HeaderLayout />
        <Router history={this.props.history}>
          <Switch>
            <Route path="/" exact component={LazyHolder(StartPage)}/>
            <Wrapper className="dc-main">
              <Wrapper className="dc-intro-page">
                <Wrapper className="dc-intro-page-tip"/>
                <Wrapper className="dc-intro-page-menu">
                  <MenuList/>
                </Wrapper>
                <Wrapper className="dc-intro-page-main">
                  <Route path="/getStarted" exact component={LazyHolder(IntroPage)}/>
                  <Route path="/test" exact component={LazyHolder(IntroPage)}/>
                  <Route path="/component/:name" exact component={LazyHolder(ComponentDocs)}/>
                </Wrapper>
                <Wrapper className="dc-intro-page-tip"/>
              </Wrapper>
            </Wrapper>
          </Switch>
        </Router>
        <Footer>
          <div className="copyright">
            Copyright&copy;2017 <a href="">微风</a> 鄂ICP备16002448号 &nbsp;&nbsp;
            <Link to="/aboutUs">关于我们 </Link> |<Link to="/siteMap">站点地图 </Link> |
            <Link to="/feedback">问题反馈 </Link> |<Link to="/leftWords">留言中心 </Link>
          </div>
        </Footer>
      </Wrapper>
    );
  }
}

export default (App);
