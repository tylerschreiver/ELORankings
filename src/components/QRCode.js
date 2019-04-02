import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from 'react-native-elements';

class QRCodeComponent extends Component {

  render() {
    const size = Math.floor((Dimensions.get('window').width * 0.8));

    return (
      <View style={styles.fullScreenQRStyle}>
        <Text style={{ color: 'white', marginTop: 10, fontSize: 24, textAlign: 'center' }}>
          {this.props.text}
        </Text>
        <View style={{ position: 'absolute', right: 10, top: 10 }} onTouchEnd={() => this.props.onClose()}>
          <Icon name="times" type="font-awesome" color="white" />
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
  }
};

export { QRCodeComponent };