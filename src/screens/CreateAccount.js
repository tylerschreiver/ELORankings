import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from '../components';
import { createAccount } from '../actions/AuthActions';
import { connect } from 'react-redux'; 


class CreateAccount extends Component {
  state = { email: '', password: '', confirmPassword: '', createAccount: false };

  createAccount() {
    const { email, password } = this.state;
    this.props.createAccount(email, password);
  }

  render() {
    const { inputSectionStyle, inputStyle, buttonStyle, labelStyle, footerStyle } = styles;
    const { email, password, confirmPassword } = this.state;

    const isDisabled = !password.length || !confirmPassword.length || password !== confirmPassword;

    return (
      <View style={{ display: 'flex', flex: 1, backgroundColor: '#36393f' }}>
        <Text style={{ color: 'white', marginTop: 5, marginLeft: 5 }} 
          onPress={() => this.props.backToSignIn()}
        >
          {"< Back To Sign In"}
        </Text>
        <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', marginTop: 100 }}>Create Account</Text>
        <View style={inputSectionStyle}>
          <Text style={labelStyle}>Email</Text>
          <TextInput 
            style={inputStyle} 
            value={email} 
            onChangeText={text => this.setState({ email: text })}
          />
        </View>

        <View style={inputSectionStyle}>
          <Text style={labelStyle}>Password</Text>
          <TextInput 
            style={inputStyle} 
            value={password}
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })} 
          />
        </View>

        <View style={inputSectionStyle}>
          <Text style={labelStyle}>Confirm Password</Text>
          <TextInput 
            style={inputStyle} 
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={text => this.setState({ confirmPassword: text })}
          />
        </View>

        <View style={footerStyle}>
          <Button disabled={isDisabled}
            onClick={() => this.createAccount()}
            text="Create Account" 
            style={buttonStyle}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  inputSectionStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    marginBottom: 30
  },
  inputStyle: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    color: 'white',
    backgroundColor: '#2f3136',
    paddingLeft: 10
  },
  buttonStyle: {
    width: '80%',
    margin: 'auto'
  },
  labelStyle: {
    color: 'white'
  },
  footerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
    alignItems: 'center'
  },
}

export default connect(null, { createAccount })(CreateAccount);