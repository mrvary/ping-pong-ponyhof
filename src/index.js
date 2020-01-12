import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/App';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

import 'normalize.css';
import './index.css';

import Test from './react/linkTest';
import NotFound from './react/NotFound';


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/test" component={Test} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
