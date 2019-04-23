import React, {Component} from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import store from './src/store';
import firebase from 'react-native-firebase';

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAW8K-5Pq5QywrZCxEQWLq6rajCgclUOYg",
      authDomain: "elo-rankings-531a9.firebaseapp.com",
      databaseURL: "https://elo-rankings-531a9.firebaseio.com",
      projectId: "elo-rankings-531a9",
      storageBucket: "elo-rankings-531a9.appspot.com",
      messagingSenderId: "791422824537"
    });
  }

  render() {
    const { homeStyle } = styles;
    return (
      <Provider store={ store }>
          <View style={homeStyle}>
            <Home />
          </View>
      </Provider>
    );
  }
}

const styles = {
  navbarStyle: {
    height: 75,
    width: '100%',
    display: 'flex'
  },
  sectionStyle: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#36393f',
    justifyContent: 'center',
    alignItems: 'center'
  }
}