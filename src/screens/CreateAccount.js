import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Button } from '../components';
import { createAccount } from '../actions/AuthActions';
import { connect } from 'react-redux'; 
import * as states from '../mockData/states.json';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import characters from '../assets/getCharacters';


class CreateAccount extends Component {
  state = { email: '', password: '', confirmPassword: '', createAccount: false, region: null, character: null, gamerTag: '' };
  charactersSearch = Object.keys(characters).map(char => { return { name: char } });
  stateNames = states.default.map(state => state.name);

  createAccount() {
    const { email, password, character, region, gamerTag } = this.state;
    const regionCode = states.default[this.stateNames.indexOf(region)].id;
    this.props.createAccount(email, password, regionCode, character, gamerTag);
  }

  render() {
    const { inputSectionStyle, inputStyle, buttonStyle, labelStyle, footerStyle } = styles;
    const { email, password, confirmPassword } = this.state;

    const isDisabled = !password.length || !confirmPassword.length || password !== confirmPassword;

    return (
      <ScrollView>
      <View style={{ display: 'flex', flex: 1, backgroundColor: '#36393f' }}>
        <Text style={{ color: 'white', marginTop: 5, marginLeft: 5 }} 
          onPress={() => this.props.backToSignIn()}
        >
          {"< Back To Sign In"}
        </Text>
        <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', marginTop: 20 }}>Create Account</Text>
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

        <View style={inputSectionStyle}>
          <Text style={labelStyle}>Choose Your Character</Text>
          <SectionedMultiSelect
            uniqueKey="name" 
            items={this.charactersSearch} 
            selectedItems={[this.state.character]} 
            selectText="Character"
            showChips={false}
            onSelectedItemsChange={chars => this.setState({ character: chars[1] })}
            styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5}, selectToggleText: { color: 'white', textAlign: 'center' } }}
          />
        </View>

        <View style={inputSectionStyle}>
          <Text style={labelStyle}>Choose Your Region</Text>
          <SectionedMultiSelect
            uniqueKey="name" 
            items={states.default} 
            selectedItems={[this.state.region]} 
            selectText="Region"
            showChips={false}
            onSelectedItemsChange={regions => this.setState({ region: regions[1] })}
            styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5}, selectToggleText: { color: 'white', textAlign: 'center' } }}
          />
        </View>

        <View style={inputSectionStyle}>
          <Text style={labelStyle}>GamerTag</Text>
          <TextInput 
            style={inputStyle} 
            value={this.state.gamerTag} 
            onChangeText={text => this.setState({ gamerTag: text })}
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
      </ScrollView>
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