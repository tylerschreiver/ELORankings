import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Navbar, SideMenuContent } from '../components';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux'; 
import { signOut } from '../actions/AuthActions';
import Login from './Login'
import Events from './Events';
import Profile from './Profile';
import Leaderboard from './Leaderboard';

class Home extends Component {
  state = { section: '' };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedIn !== this.props.signedIn) {
      this.setState({ section: 'Events' });
    }
  }

  renderSection() {
    switch (this.state.section) {
      case 'Events': return <Events />;
      case 'Leaderboard': return <Leaderboard />;
      case 'Profile': return <Profile />;
      default: return <Events />
    }
  }
  
  render() {
    const { navbarStyle, homeStyle, sectionStyle } = styles;
    const sideMenu = <SideMenuContent />;
    if (!this.props.signedIn) return <Login />

    return (
      <SideMenu menu={sideMenu} toleranceX={1} openMenuOffset={200}
      // disableGestures={true}
        animationFunction={(prop, value) => Animated.spring(prop, {
            toValue: value,
          friction: 10,
        })}
        >      
        <View style={homeStyle}>
          <View style={sectionStyle}>
            {this.renderSection()}
          </View>
          <Navbar navigate={(section) => this.setState({ section })} style={navbarStyle}/>
        </View>
      </SideMenu>
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
  console.log(state);
  return { signedIn: state.AuthReducer.signedIn };
};


export default connect(mapStateToProps, { signOut })(Home);