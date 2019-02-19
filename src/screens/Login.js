import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from '../components';
import { connect } from 'react-redux'; 
import { signIn } from '../actions/AuthActions';

class Login extends Component {
  state = { email: '', password: '' };

  handleLoginAttempt() {
    this.props.signIn();
  }
  
  render() {
    const { email, password } = this.state;
    const { inputStyle, inputSectionStyle, labelStyle, buttonStyle, footerStyle } = styles;

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', marginTop: 100 }}>Sign In</Text>

        <View style={inputSectionStyle}>
          <Text style={labelStyle}>Email</Text>
          <TextInput 
            style={inputStyle} 
            value={email} 
            onChange={(e) => this.setState({ email: e.target.value })} 
          />
        </View>

        <View style={inputSectionStyle}>
          <Text style={labelStyle}>Password</Text>
          <TextInput 
            style={inputStyle} 
            value={password}
            secureTextEntry={true}
            onChange={(e) => this.setState({ password: e.target.value })} 
          />
        </View>

        <View style={footerStyle}>
          <Button onClick={() => this.handleLoginAttempt()} text="Log In" style={buttonStyle}/>
        </View>
      </View>
    );
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
  labelStyle: {
    color: 'white'
  },
  buttonStyle: {
    width: '80%',
    margin: 'auto'
  },
  footerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
    alignItems: 'center'
  }
}

const mapStateToProps = ({ AuthReducer }) => {
  return { signedIn: AuthReducer.signedIn };
};

export default connect(mapStateToProps, { signIn })(Login);