import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class Navbar extends Component {
  state = { currentSection: 'Events' };

  handleNavPress(currentSection) {
    if (Actions.currentScene !== currentSection) {
      this.props.navigate(currentSection);
      this.setState({ currentSection });
    }
  }

  render() {
    const { iconStyle, activeIconTextStyle, navbarStyle, iconTextStyle, touchableStyle } = styles;
    const { currentSection } = this.state;
    return (
      <View style={[navbarStyle, this.props.style]}>
        <View style={iconStyle}>
          <TouchableOpacity 
            style={touchableStyle} 
            onPress={this.handleNavPress.bind(this, "Events")} 
          >
            <View style={iconStyle}>
              <Icon name="calendar" type="font-awesome" color={currentSection === "Events" ? 'white' : 'grey'}/>
              <Text style={currentSection === "Events" ? activeIconTextStyle : iconTextStyle}>Events</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ width: 1, backgroundColor: 'white' }}/>


        <View style={iconStyle}>
          <TouchableOpacity 
            style={touchableStyle} 
            onPress={this.handleNavPress.bind(this, "Leaderboard")}
          >
            <View style={iconStyle}>
              <Icon name="trophy" type="font-awesome" color={currentSection === "Leaderboard" ? 'white' : 'grey'}/>
              <Text style={currentSection === "Leaderboard" ? activeIconTextStyle : iconTextStyle}>Leaderboard</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ width: 1, backgroundColor: 'white' }}/>

        <View style={iconStyle}>
          <TouchableOpacity 
            style={touchableStyle} 
            onPress={this.handleNavPress.bind(this, "Profile")}
          >
            <View style={iconStyle}>
              <Icon name="user" type="font-awesome" color={currentSection === "Profile" ? 'white' : 'grey'}/>
              <Text style={currentSection === "Profile" ? activeIconTextStyle : iconTextStyle}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  navbarStyle: {
    flexDirection: 'row',
    backgroundColor: '#2f3136'
  },
  iconStyle: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconTextStyle: {
    color: 'grey',
    fontSize: 12
  },  
  activeIconTextStyle: {
    color: 'white',
    fontSize: 12
  },
  touchableStyle: {
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    backgroundColor: '#36393f'
  }

}

export { Navbar };