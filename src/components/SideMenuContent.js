import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native'
class SideMenuContent extends Component {

  render() {
    const { menuStyle } = styles;
    return (
      <ScrollView style={menuStyle} scrollsToTop={false}>
        <View>
          <Text style={{ fontSize: 18, color: 'white', marginBottom: 15 }}>Communities</Text>

          <Text style={{ color:'white', marginBottom: 4 }}>Super Smash Bros Melee</Text>
          <Text style={{ color:'white', marginBottom: 4 }}>Chess</Text>
          <Text style={{ color:'white', marginBottom: 4 }}>Rock Paper Scissors</Text>
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
    flexDiretion: 'row'
  }
}

export { SideMenuContent };