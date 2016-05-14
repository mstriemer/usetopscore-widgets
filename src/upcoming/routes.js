import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/App';
import UpcomingGames from './containers/UpcomingGames';
import SelectTeams from './containers/SelectTeams';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UpcomingGames} />
    <Route path="teams" component={SelectTeams} />
  </Route>
);
