import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from 'react-native-elements';
import isIphoneX from './IsIphoneX';

class QRCodeComponent extends Component {
  isIphoneX = false;

  UNSAFE_componentWillMount() {
    const dim = Dimensions.get('window');
    this.isIphoneX = isIphoneX(dim, Platform);
  }

  render() {
    const { iphoneXStyle, fullScreenQRStyle, headerTextStyle } = styles;
    const size = Math.floor((Dimensions.get('window').width * 0.8));
    const totalFullScreenStyle = [ fullScreenQRStyle ];

    if (this.isIphoneX) totalFullScreenStyle.push(iphoneXStyle)

    return (
      <View style={totalFullScreenStyle}>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <Text style={headerTextStyle}>
            {this.props.text}
          </Text>
          <View style={{ justifyContent: 'center' }} onTouchEnd={() => this.props.onClose()}>
            <Icon name="times" type="font-awesome" color="white" />
          </View>
        </View>
        <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <QRCode 
            value={this.props.value} 
            size={size}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  fullScreenQRStyle: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#36393f'
  },
  iphoneXStyle: {
    paddingTop: 30
  },
  headerTextStyle: { 
    color: 'white', 
    marginTop: 5, 
    marginBottom: 5, 
    fontSize: 24, 
    textAlign: 'center', 
    marginLeft: 19, 
    flex: 1 
  }
};

export { QRCodeComponent };