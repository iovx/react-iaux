import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import App from './App';
import Test2 from './pages/test/Test2';
import Test3 from './pages/test/Test3';

// import '../dist/react-iaux.css';

const history = createBrowserHistory();

function RouteConfig() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/test2" component={Test2}/>
        <Route path="/test3" component={Test3}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<RouteConfig/>, document.getElementById('root'));
