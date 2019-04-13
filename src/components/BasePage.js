import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './Header';

class BasePage extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.headerText !== nextProps.headerText;
  }

  render() {
    return (
      <View style={{ height: '100%', width: '100%', backgroundColor: '#36393f'}}>
        <Header rightIcon={this.props.rightIcon} 
          leftIcon={this.props.leftIcon} 
          headerText={this.props.headerText}
        />
        {this.props.children}
      </View>
    )
  }
}

export { BasePage };