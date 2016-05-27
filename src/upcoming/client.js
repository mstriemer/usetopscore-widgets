import makeClient from 'core/client/base';
import routes from './routes';
import createStore from './store';

import serviceWorker from 'file!upcoming/serviceworker';

makeClient(routes, createStore);

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('serviceworker.js');
}
