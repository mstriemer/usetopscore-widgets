import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';

export default function makeClient(routes, createStore) {
  const initialStateContainer = document.getElementById('redux-store-state');
  const localStorageState = localStorage.getItem('redux-store-state');
  let initialState;

  if (localStorageState) {
    initialState = JSON.parse(localStorageState);
  }
  if (!initialState && initialStateContainer) {
    try {
      initialState = JSON.parse(initialStateContainer.textContent);
    } catch (error) {
      console.error('Could not load initial redux data'); // eslint-disable-line no-console
    }
  }
  const store = createStore(initialState);

  store.subscribe(
    () => localStorage.setItem('redux-store-state', JSON.stringify(store.getState())));

  function reduxAsyncConnectRender(props) {
    return <ReduxAsyncConnect {...props} />;
  }

  render(
    <Provider store={store} key="provider">
      <Router render={reduxAsyncConnectRender} children={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('react-view')
  );
}
