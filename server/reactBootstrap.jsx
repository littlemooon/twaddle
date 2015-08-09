import React from 'react';
import { Router, Route } from 'react-router';
import Location from 'react-router/lib/Location';
import { createStore, combineReducers,
  applyMiddleware, composeMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';
import { batchedUpdatesMiddleware } from 'redux-batched-updates';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import fetchComponentData from 'lib/fetchComponentData';
import routes from 'routes';
import * as reducers from 'reducers';

export default function(app) {
  app.use(function *(next) {
    const location = new Location(this.path, this.query);

    const reducer = combineReducers({
      router: routerStateReducer,
      ...reducers
    });

    const m = composeMiddleware(thunk, promise, batchedUpdatesMiddleware);

    const storeCreator = applyMiddleware(m)(createStore);
    const store = storeCreator(reducer);

    if (this.path.substr(0, 5).toLowerCase() === '/api/') {
      yield next;
      return;
    }

    this.body = yield new Promise(resolve => {
      Router.run(routes, location, (err, routeState) => {
        if (err) return console.error(err);
        if(routeState) {
          fetchComponentData(
            store.dispatch,
            routeState.components,
            routeState.params)
            .then(renderView(store, routeState))
            .then(html => resolve(html))
            .catch(err => resolve(err.message));
        }
      });
    });
  });
}

const renderView = (store, routeState) => () => {
  const InitialView = (
    <Provider store={store}>
      {() =>
        <Router>
          <Route {...routeState} component={reduxRouteComponent(store)}/>
        </Router>
      }
    </Provider>
  );

  const componentHTML = React.renderToString(InitialView);
  const initialState = store.getState();

  return renderFullHtml(componentHTML, initialState);
};

const renderFullHtml = (html, initialState) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Twaddle</title>
      </head>
      <body>
        <div id="react-view">${html}</div>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;
};
