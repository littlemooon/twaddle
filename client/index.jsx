import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { createStore, combineReducers,
  applyMiddleware, composeMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';
import { batchedUpdatesMiddleware } from 'redux-batched-updates';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import immutifyState from 'lib/immutifyState';
import * as reducers from 'reducers';
import routes from 'routes';

const initialState = immutifyState(window.__INITIAL_STATE__);
const reducer = combineReducers({
  router: routerStateReducer,
  ...reducers
});

const m = composeMiddleware(thunk, promise, batchedUpdatesMiddleware);

const storeCreator = applyMiddleware(m)(createStore);
const store = storeCreator(reducer, initialState);

React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route children={routes} component={reduxRouteComponent(store)}/>
      </Router>
    }
  </Provider>,
  document.getElementById('react-view')
);
