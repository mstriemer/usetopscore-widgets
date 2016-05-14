import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/App';
import UpcomingGames from './containers/UpcomingGames';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UpcomingGames} />
  </Route>
);
