// From: https://github.com/reactjs/redux/blob/master/examples/real-world/containers/Root.prod.js

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from './routes';
import { Router } from 'react-router';

// TODO: Move to React.createClass ?
export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
