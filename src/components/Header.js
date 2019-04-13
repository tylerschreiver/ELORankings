import React, { Component } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import isIphoneX from './IsIphoneX';

class Header extends Component {
  isIphoneX = false;

  UNSAFE_componentWillMount() {
    const dim = Dimensions.get('window');
    this.isIphoneX = isIphoneX(dim, Platform);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.headerText !== nextProps.headerText ||
      this.props.rightIcon !== nextProps.rightIcon ||
      this.props.leftIcon !== nextProps.leftIcon;
  }

  render() {
    const { headerStyle, xHeaderStyle, headerTextStyle, iconStyle, iconHolder } = styles;
    const { headerText, leftIcon, rightIcon } = this.props;
    const totalHeaderStyle = [ headerStyle ];
    if (this.isIphoneX) totalHeaderStyle.push(xHeaderStyle);

    return (
      <View style={totalHeaderStyle}>
        <View style={iconHolder}>
          { leftIcon && leftIcon.name !== '' &&
            <Icon iconStyle={iconStyle} 
              color="white" 
              name={leftIcon ? leftIcon.name : ''} 
              type="font-awesome"
              onPress={() => { if(leftIcon) leftIcon.onPress() } }
            />
          }
        </View>

        <Text style={headerTextStyle}>{headerText}</Text>

        <View style={iconHolder}>
          { rightIcon && rightIcon.name !== '' &&
            <Icon iconStyle={iconStyle} 
              color="white" 
              name={rightIcon ? rightIcon.name : ''} 
              onPress={() => { if(rightIcon) rightIcon.onPress()} }
              type="font-awesome"
            />
          }
        </View>
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
  xHeaderStyle: {
    marginTop:30
  },
  iconStyle: {
    marginLeft: 15,
    marginRight: 15,
  },
  iconHolder: {
    width: 55,
    height: 'auto'
  }
}

export { Header };

