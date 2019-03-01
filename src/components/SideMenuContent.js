import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { signOut } from '../actions/AuthActions'
import { connect } from 'react-redux'; 


class SideMenuContentComponent extends Component {

  render() {
    const { menuStyle, logoutStyle, communityStyle, logoutWrapperStyle } = styles;
    return (  
      <ScrollView contentContainerStyle={menuStyle} scrollsToTop={false}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, color: 'white', marginBottom: 15 }}>Communities</Text>

          <Text style={communityStyle}>Super Smash Bros Melee</Text>
          <Text style={communityStyle}>Chess</Text>
          <Text style={communityStyle}>Rock Paper Scissors!!</Text>

          <View onTouchEnd={() => this.props.signOut()} style={logoutWrapperStyle}>
            <Text style={logoutStyle}>Logout</Text>
          </View>
        </View>
      </ScrollView>

    );
  }
}

const styles = {
  menuStyle: {
    backgroundColor: '#202225',
    height: '100%',
    paddingTop: 30,
    display: 'flex',
    flex: 1,
    flexDiretion: 'column'
  },
  logoutWrapperStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'white',
  },
  logoutStyle: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  communityStyle: {
    display: 'flex',
    color: 'white',
    marginBottom: 4
  }
}


const SideMenuContent = connect(null, { signOut })(SideMenuContentComponent);
export { SideMenuContent };