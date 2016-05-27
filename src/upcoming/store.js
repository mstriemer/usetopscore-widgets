import { applyMiddleware, createStore as _createStore, combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import createLogger from 'redux-logger';

import entities from 'core/reducers/entities';
import upcomingGames from './reducers/upcomingGames';
import teams from './reducers/teams';
import me from './reducers/me';
import api from 'core/reducers/api';

export default function createStore(initialState = {}) {
  return _createStore(
    combineReducers({api, entities, me, reduxAsyncConnect, teams, upcomingGames}),
    initialState,
    applyMiddleware(createLogger()),
  );
}
