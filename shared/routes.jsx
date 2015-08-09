import React from 'react';
import { Route } from 'react-router';

import App from 'components/_layout/App';
import Entry from 'components/entry/Entry';
import Review from 'components/review/Review';

export default (
  <Route name='app' component={App} path='/'>
    <Route component={Entry} path='entries'/>
    <Route component={Review} path='review'/>
  </Route>
);
