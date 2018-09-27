// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from '../components/Home';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
       <Home />
      </Provider>
    );
  }
}
