import React from 'react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from 'lib/promiseMiddleware';
import immutifyState from 'lib/immutifyState';
import * as reducers from 'reducers';
import routes from 'routes';

const initialState = immutifyState(window.__INITIAL_STATE__);
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
