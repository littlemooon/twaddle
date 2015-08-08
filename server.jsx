import React from 'react';
import express from 'express';
import { Router } from 'react-router';
import Location from 'react-router/lib/Location';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from 'lib/promiseMiddleware';
import fetchComponentData from 'lib/fetchComponentData';
import routes from 'shared/routes';
import * as reducers from 'shared/reducers';

const app = express();

app.use((req, res) => {
  const location = new Location(req.path, req.query);
  const reducer = combineReducers(reducers);
  const storeCreator = applyMiddleware(promiseMiddleware)(createStore);
  const store = storeCreator(reducer);

  if (req.path === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    return res.end();
  }

  Router.run(routes, location, (err, routeState) => {
    if (err) return console.error(err);

    // Check this is rendering *something*, for safety
    if(routeState) {
      fetchComponentData(
        store.dispatch,
        routeState.components,
        routeState.params)
        .then(renderView(store, routeState))
        .then(html => res.end(html))
        .catch(err => res.end(err.message));
    }
  });
});

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

export default app;
