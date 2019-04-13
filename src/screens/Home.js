import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux'; 

import { signOut } from '../actions/AuthActions';
import { getEvents } from '../actions/EventActions';
import { Navbar, SideMenuContent } from '../components';

import Events from './Events';
import Profile from './Profile';
import Login from './Login';
import EventScreen from './EventScreen';
import Leaderboard from './Leaderboard';
import SetScreen from './SetScreen';
import CreateEvent from './CreateEvent';

class Home extends Component {
  state = { section: '' };
  constructor(props) {
    super(props);
  }

  async UNSAFE_componentWillMount() {
    await this.props.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedIn !== this.props.signedIn) {
      this.setState({ section: 'Events' });
    }
  }

  changeSection(section) {
    switch(section) {
      case 'Events': 
        Actions.Events();
        break;
      case 'Leaderboard': 
        Actions.Leaderboard();
        break;
      case 'Profile': 
        Actions.Profile();
        break;
    }
  }
  
  render() {
    const { navbarStyle, homeStyle, sectionStyle } = styles;
    const sideMenu = <SideMenuContent />;
    if (!this.props.signedIn) {
      return (
        <View style={{ height: '100%', width: '100%', backgroundColor: '#36393f' }}>
          <Login />
        </View>
      );
    }

    return (
      <View style={{ height: '100%', width: '100%', backgroundColor: '#36393f' }}>
        <SideMenu menu={sideMenu} toleranceX={1} openMenuOffset={200}
          animationFunction={(prop, value) => Animated.spring(prop, {
            toValue: value,
            friction: 10,
          })}
        >
          <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="Events" component={Events} initial="true" />
                <Scene key="CreateEvent" component={CreateEvent} />
                <Scene key="Leaderboard" component={Leaderboard} />
                <Scene key="Profile" component={Profile} />
                <Scene key="EventScreen" component={EventScreen} />
                <Scene key="Set" component={SetScreen} />
            </Scene>
          </Router>
          <Navbar navigate={(section) => this.changeSection(section)} style={navbarStyle}/>
        </SideMenu>
      </View>
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
  homeStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  }
}

// is only called on init
const mapStateToProps = (state) => {
  return { signedIn: state.AuthReducer.signedIn };
};


export default connect(mapStateToProps, { signOut, getEvents })(Home);