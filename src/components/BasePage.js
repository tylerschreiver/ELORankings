import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './Header';

class BasePage extends Component {

  render() {
    console.log(this.props);
    return (
      <View style={{ height: '100%', width: '100%', backgroundColor: '#36393f' }}>
        <Header headerText={this.props.headerText}/>
        {this.props.children}
      </View>
    )
  }
}

export { BasePage };