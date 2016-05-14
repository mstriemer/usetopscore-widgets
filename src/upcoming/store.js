import { applyMiddleware, createStore as _createStore, combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import createLogger from 'redux-logger';

import entities from 'core/reducers/entities';
import upcomingGames from './reducers/upcomingGames';

export default function createStore(initialState = {}) {
  return _createStore(
    combineReducers({entities, reduxAsyncConnect, upcomingGames}),
    initialState,
    applyMiddleware(createLogger()),
  );
}
