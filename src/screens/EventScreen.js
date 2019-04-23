import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux'; 
import { Actions } from 'react-native-router-flux';

import { BasePage, Button, QRCodeComponent, QRScanner } from '../components';
import { eventSignIn, eventSignOut, createSet, joinSet } from '../actions/EventActions';

class EventScreen extends Component {
  isAdmin = false;
  state = { showSignInQR: false, showCreateMatchQR: false, showFindMatch: false, info: "", setId: "" };

  shouldComponentUpdate(prevProps) {
    this.isAdmin = this.props.selectedEvent.eventAdmins.includes(this.props.uid);
    if (this.props.signedInEvent !== prevProps.signedInEvent) {
      return true;
    } else if (this.props.setId !== prevProps.setId) {
      return true;
    }
    return true;
  }

  componentDidUpdate(props) {
    if (props.setId !== this.props.setId) this.setState({ showCreateMatchQR: true });
  }

  openLink(link) {
    if (link.indexOf('http://') === -1 || link.indexOf('https://') === -1) link = 'http://' + link;
    Linking.openURL(link);
  }

  pressCreateSet() {
    this.props.createSet({ bestOf: 5, eventId: this.props.signedInEvent.id });
  }

  async joinSet(setId) {
    this.props.joinSet({ setId, eventId: this.props.signedInEvent.id });
    this.setState({ showFindMatch: false });
    Actions.Set()
  }

  eventSignIn(eventId) {
    this.setState({ showSignInQR: false });
    this.props.eventSignIn(eventId);
  }

  renderQRScanner() {
    return (
      <QRScanner exitScanner={result => {
          if (this.state.showSignInQR) {
            if (result.data === this.props.selectedEvent.eventId) this.eventSignIn(result.data);
            else console.log('well tgus us a lil fukt up');
          }
          else if (this.state.showFindMatch) this.joinSet(result.data);
        }}
      />
    )
  }

  renderQRCode() {
    const { showSignInQR } = this.state;
    const qrText = showSignInQR ? "Sign In" : "Create Match";
    const value = showSignInQR ? this.props.selectedEvent.eventId : this.props.setId;

    return (
      <QRCodeComponent 
        value={value} 
        text={qrText}
        onClose={() => this.setState({ showSignInQR: false, showCreateMatchQR: false })}
      />
    );
  }

  render() {
    const { buttonStyle, eventSectionStyle, twoButtonStyle, eventInfoText } = styles;
    const { selectedEvent, signedInEvent, uid } = this.props;
    const { showSignInQR, showCreateMatchQR, showFindMatch } = this.state;

    
    if (!selectedEvent) return null;
    if (showFindMatch || showSignInQR) return this.renderQRScanner();
    if (showCreateMatchQR) return this.renderQRCode(); 

    const rightIcon = signedInEvent === selectedEvent 
      ? { name: "sign-out", onPress: () => this.props.eventSignOut() } 
      // todo remove auto sign in
      : { name: "sign-in", onPress: () => {
        if (this.isAdmin) {
          this.props.eventSignIn(this.props.selectedEvent);
        } else {
          this.setState({ showSignInQR: true })
        }
      }};
      // : { name: "sign-in", onPress: () => { this.props.eventSignIn(this.props.selectedEvent) }};
    
    return (
      <BasePage 
        leftIcon={{ name: "chevron-left", onPress: () => Actions.pop() }} 
        rightIcon={rightIcon} 
        headerText={selectedEvent.name}
      >
        <ScrollView>
          <View style={{ alignItems: 'center', width: '100%' }}>
            
            <View style={eventSectionStyle}>
              <Text style={eventInfoText}>{selectedEvent.description}</Text>
              <Text style={eventInfoText}>{selectedEvent.address}</Text>
              <View onTouchEnd={() => this.openLink(selectedEvent.tourneyLink)}>
                <Text style={eventInfoText}>{selectedEvent.tourneyLink}</Text>
              </View>
            </View>

            { this.props.signedInEvent === this.props.selectedEvent &&
              <View style={{ flex: 1, flexDirection: 'row', width: '80%', height: 'auto', justifyContent: 'space-between' }}>
                <Button text="Create Match" 
                  style={twoButtonStyle}
                  onClick={() => this.pressCreateSet()} 
                />
                <Button text="Join Match" 
                  style={twoButtonStyle}
                  onClick={() => this.setState({ showFindMatch: true })} 
                />
              </View>
            }


            <View style={{ flex: 1, flexDirection: 'row' }}></View>
            <Button text="View Attendees" 
              style={buttonStyle}
              onClick={() => console.log("clicked a thingy") } 
            />

            { this.isAdmin &&            
              <Button text="Create Signin QR" 
                style={buttonStyle}
                onClick={() => this.setState({ showSignInQR: true }) } 
              />
            }

            <Button
              text="crash app" 
              style={buttonStyle}
            />

            <Text>{this.state.info}</Text>
          </View>
        </ScrollView>
      </BasePage>
    );
  }
}

const styles = {
  buttonStyle: {
    width: '80%',
    marginBottom: 20,
    margin: 'auto'
  },
  twoButtonStyle: {
    width: '45%',
    marginBottom: 20,
    margin: 'auto'
  },
  eventSectionStyle: {
    width: '80%',
    margin: 'auto',
    marginBottom: 20,
    backgroundColor: '#4c4f54',
    borderWidth: 1,
    bordedrColor: 'black',
    borderRadius: 5,
    padding: 10
  },
  eventInfoText: {
    fontSize: 18,
    color: 'white'
  }
}

const mapStateToProps = ({ EventsReducer, SetReducer, AuthReducer }) => {
  const { selectedEvent, signedInEvent } = EventsReducer;
  const { setId } = SetReducer;
  const { uid } = AuthReducer;
  return { selectedEvent, signedInEvent, setId, uid };
}

export default connect(mapStateToProps, { eventSignIn, eventSignOut, createSet, joinSet })(EventScreen);