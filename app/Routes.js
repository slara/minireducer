/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import StatusPage from './containers/StatusPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.STATUS} component={StatusPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
