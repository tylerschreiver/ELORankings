import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class Header extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.headerText !== nextProps.headerText;
  }

  render() {
    const { headerStyle, headerTextStyle, iconStyle } = styles;
    const { headerText } = this.props;
    return (
      <View style={headerStyle}>
        {/* <View style={iconStyle}> */}
          <Icon iconStyle={iconStyle} color="white" name="chevron-left" type="font-awesome" onPress={() => Actions.pop()} />
        {/* </View> */}
        <Text style={headerTextStyle}>{headerText}</Text>
        {/* <View style={iconStyle}> */}
          <Icon iconStyle={iconStyle} color="white" name="ellipsis-v" type="font-awesome" />
        {/* </View> */}
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    fontSize: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: '#4c4f54'
  },
  headerTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18
  },
  iconStyle: {
    marginLeft: 15,
    marginRight: 15
  }
}

export { Header };

