import React from 'react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import promiseMiddleware from 'lib/promiseMiddleware';
import * as reducers from 'reducers';
import routes from 'routes';

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
const toImmutable = obj => Object.keys(obj).reduce((acc, key) => {
  acc[key] = fromJS(obj[key]);
  return acc;
}, {});

const initialState = toImmutable(window.__INITIAL_STATE__);
const reducer = combineReducers(reducers);
const storeCreator = applyMiddleware(promiseMiddleware)(createStore);
const store = storeCreator(reducer, initialState);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);
