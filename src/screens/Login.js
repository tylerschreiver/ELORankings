import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from '../components';
import { connect } from 'react-redux'; 
import { signIn } from '../actions/AuthActions';
import CreateAccount from './CreateAccount';

class Login extends Component {
  // state = { email: 'ebmcla01@louisville.edu', password: 'password', createAccount: false };
  state = { email: 'tyschreiver+35@gmail.com', password: 'password', createAccount: false };

  handleLoginAttempt() {
    this.props.signIn(this.state.email, this.state.password);
  }
  
  render() {
    const { email, password, createAccount } = this.state;
    const { inputStyle, inputSectionStyle, labelStyle, buttonStyle, footerStyle, createAccountStyle, errorStyle } = styles;
    const { error } = this.props;

    if (createAccount) {
      return <CreateAccount backToSignIn={() => this.setState({ createAccount: false })}/>
    }

    return (
      <View style={{ display: 'flex', flex: 1, backgroundColor: '#36393f', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', marginTop: 100 }}>Sign In</Text>

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

        <Text style={errorStyle}>{error}</Text>

        <View style={footerStyle}>
          <Button disabled={!email.length || !password.length} 
            onClick={() => this.handleLoginAttempt()} 
            text="Log In" 
            style={buttonStyle}
          />
        </View>

        <Text onPress={() => this.setState({ createAccount: true })} style={createAccountStyle}>Create Account</Text>
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
    padding: 10,
    paddingLeft: 10,
    fontSize: 16
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
  },
  createAccountStyle: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 15
  },
  errorStyle: {
    color: 'red',
    fontSize: 18,
    alignSelf: 'center'
  }
}

const mapStateToProps = ({ AuthReducer }) => {
  const { signedIn, error } = AuthReducer;
  return { signedIn, error };
};

export default connect(mapStateToProps, { signIn })(Login);