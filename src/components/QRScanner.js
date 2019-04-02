import React, { Component } from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class QRScanner extends Component {

  render() {
    return (
      <QRCodeScanner
        onRead={e => this.props.exitScanner(e)}
        topContent={<Text>Scan the QR Code</Text>}
      />
    )
  }
}

export { QRScanner };