import React from 'react';
import { Router } from 'react-router';
import Location from 'react-router/lib/Location';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from 'lib/promiseMiddleware';
import fetchComponentData from 'lib/fetchComponentData';
import routes from 'shared/routes';
import * as reducers from 'shared/reducers';

export default function(app) {
  app.use(function *() {
    const location = new Location(this.path, this.query);
    const reducer = combineReducers(reducers);
    const storeCreator = applyMiddleware(promiseMiddleware)(createStore);
    const store = storeCreator(reducer);

    this.body = yield new Promise(resolve => {
      Router.run(routes, location, (err, routeState) => {
        if (err) return console.error(err);

        // Check this is rendering *something*, for safety
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
        <Router {...routeState} />
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
