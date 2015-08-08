import React from 'react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from '../shared/lib/promiseMiddleware';
import immutifyState from '../shared/lib/immutifyState';
import * as reducers from '../shared/reducers';
import routes from '../shared/routes';

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
