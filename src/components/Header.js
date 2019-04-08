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
    const { headerText, leftIcon, rightIcon } = this.props;
    return (
      <View style={headerStyle}>
        <Icon iconStyle={iconStyle} 
          color="white" 
          name={leftIcon ? leftIcon.name : ''} 
          type="font-awesome"
          onPress={() => { if(leftIcon) leftIcon.onPress()}}  
        />

        <Text style={headerTextStyle}>{headerText}</Text>

        <Icon iconStyle={iconStyle} 
          color="white" 
          name={rightIcon ? rightIcon.name : ''} 
          onPress={() => { if(rightIcon) rightIcon.onPress()}}
          type="font-awesome" 
        />
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
  },
  iconStyle: {
    marginLeft: 15,
    marginRight: 15
  }
}

export { Header };

