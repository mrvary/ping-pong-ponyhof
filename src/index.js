import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/App';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import 'normalize.css';
import './index.css';

import NotFound from './react/NotFound';
import CompetitionPage from './react/components/CompetitionPage';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/competition/:competitionID" component={CompetitionPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
