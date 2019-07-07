import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route, Router, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import App from './App';

import '../dist/react-iaux.css';

const history = createBrowserHistory();

function RouteConfig() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<RouteConfig/>, document.getElementById('root'));
