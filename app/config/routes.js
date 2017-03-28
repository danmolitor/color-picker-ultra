import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import MainContainer from '../modules/main-container';
import HomePage from '../modules/homepage/HomePage';

const Routes = (

    <Route path="/" component={MainContainer}>
      <IndexRoute component={HomePage} />

    </Route>

);

export default Routes;
