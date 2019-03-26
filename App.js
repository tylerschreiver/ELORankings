import React, {Component} from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import store from './src/store';
// import { Router, Scene, Actions } from 'react-native-router-flux'
// import Events from './src/screens/Events'
// import Leaderboard from './src/screens/Leaderboard'
// import Profile from './src/screens/Profile'
// import { Navbar, SideMenuContent } from './src/components';
// import SideMenu from 'react-native-side-menu';
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

  // changeSection(section) {
  //   switch(section) {
  //     case 'Events': 
  //       Actions.Events();
  //       break;
  //     case 'Leaderboard': 
  //       Actions.Leaderboard();
  //       break;
  //     case 'Profile': 
  //       Actions.Profile();
  //       break;
  //   }
  // }

  render() {
    const { navbarStyle, homeStyle, sectionStyle } = styles;

    // const sideMenu = <SideMenuContent />;
    return (
      <Provider store={ store }>
          <View style={homeStyle}>
            {/* <View style={{ height: '100%', width: '100%', backgroundColor: '#36393f' }}> */}
            <Home />
              {/* <Router>
                <SideMenu menu={sideMenu} toleranceX={1} openMenuOffset={200}
                  animationFunction={(prop, value) => Animated.spring(prop, {
                    toValue: value,
                    friction: 10,
                  })}
                >      
                  <Scene key="root" hideNavBar={true}>
                      <Scene key="Events" component={Events} initial="true" />
                      <Scene key="Leaderboard" component={Leaderboard} />
                      <Scene key="Profile" component={Profile} />
                  </Scene>
                </SideMenu>
              </Router>
            </View>
            <Navbar navigate={(section) => this.changeSection(section)} style={navbarStyle}/> */}
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
  },
  // homeStyle: {
  //   display: 'flex',
  //   flex: 1,
  //   flexDirection: 'column',
  //   width: '100%',
  //   height: '100%'
  // }
}