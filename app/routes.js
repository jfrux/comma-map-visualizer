/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
export default () => (
  <App path="/" component={ Home }>
  </App>
);
