import { Schema, arrayOf, normalize } from 'normalizr';

import config from 'config';

import 'isomorphic-fetch';

const API_BASE = config.get('apiBase');

const game = new Schema('games');

function formatParam(key, value) {
  return `${key}=${value}`;
}

function makeQueryString(opts) {
  // FIXME: This should use a real query string generator.
  return Object.keys(opts).map((key) => {
    const value = opts[key];
    if (Array.isArray(value)) {
      return value.map((val) => formatParam(key, val)).join('&');
    }
    return formatParam(key, value);
  }).join('&');
}

function callApi({endpoint, schema, params, auth = false, state = {}, method = 'get', body,
                  credentials}) {
  const queryString = makeQueryString(params);
  const options = {
    headers: {},
    method,
  };
  if (credentials) {
    options.credentials = 'include';
  }
  if (body) {
    options.body = JSON.stringify(body);
    options.headers['Content-type'] = 'application/json';
  }
  if (auth) {
    if (state.token) {
      options.headers.authorization = `Bearer ${state.token}`;
    }
  }
  return fetch(`${API_BASE}/${endpoint}?${queryString}`, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error calling API');
    })
    .then((response) => (schema ? normalize(response, schema) : response));
}

export function upcomingGames() {
  return callApi({
    endpoint: 'games',
    params: {
      order_by: 'start_date%20asc',
      'team_id[]': [121562, 121226],
      min_date: '2015-10-26',
    },
    schema: {result: arrayOf(game)},
  });
}
