/**
 * @author William Kistenberger
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/App';
import { Route, HashRouter, Switch } from 'react-router-dom';

import 'normalize.css';

import NotFound from './react/NotFound';
import CompetitionPage from './react/components/CompetitionPage';
import StatisticTable from './react/components/StatisticTable';

const routing = (
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/competition/:competitionID" component={CompetitionPage} />
        <Route
          path="/statisticTable/:competitionID"
          component={StatisticTable}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  </HashRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
