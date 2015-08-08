import React from 'react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import * as reducers from 'reducers';
import routes from 'routes';

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
const toImmutable = obj => Object.keys(obj)
  .forEach(key => obj[key] = fromJS(obj[key]));

const initialState = toImmutable(window.__INITIAL_STATE__);
const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);
