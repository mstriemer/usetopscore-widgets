import makeClient from 'core/client/base';
import routes from './routes';
import createStore from './store';

makeClient(routes, createStore);

if (navigator.serviceWorker) {
  console.log('registering serviceworker');
  navigator.serviceWorker.register('/serviceworker.js');
} else {
  console.log('no serviceworker');
}
