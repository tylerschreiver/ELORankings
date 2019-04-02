import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Header extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.headerText !== nextProps.headerText;
  }

  render() {
    const { headerStyle, headerTextStyle } = styles;
    const { headerText } = this.props;
    return (
      <View style={headerStyle}>
        <Text style={headerTextStyle}>{headerText}</Text>
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: '#4c4f54'
  },
  headerTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18
  }


}

export { Header };

