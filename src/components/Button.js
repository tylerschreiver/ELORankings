import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native'

class Button extends Component {
  

  render() {
    const { buttonStyle, buttonTextStyle, disabledStyle } = styles;
    const { disabled } = this.props;
    let buttonStyles = [buttonStyle, this.props.style];
    if (disabled) buttonStyles.push(disabledStyle);
    
    return (
      <View onTouchEnd={() => { if(!disabled) this.props.onClick() }} style={buttonStyles}>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('white', true)}>
          <View>
            <Text style={buttonTextStyle}>{this.props.children || this.props.text}</Text>

          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

styles = {
  buttonStyle: {
    width: '100%',
    borderColor: 'rebeccapurple',
    borderWidth: 1,
    backgroundColor: 'rebeccapurple',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24
  },
  disabledStyle: {
    backgroundColor: 'gray',
    borderColor: 'gray'
  }
}

export { Button };