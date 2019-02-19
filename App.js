/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import store from './src/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <View style={{ height: '100%', width: '100%', backgroundColor: '#36393f' }}>
          <Home />
        </View>
      </Provider>
    );
  }
}