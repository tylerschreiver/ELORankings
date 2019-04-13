import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux'; 
import { Actions } from 'react-native-router-flux';

import { BasePage, Button, QRCodeComponent, QRScanner } from '../components';
import { eventSignIn, eventSignOut } from '../actions/EventActions';

class EventScreen extends Component {

  state = { showSignInQR: false, showCreateMatchQR: false, showFindMatch: false, info: "" };

  openLink(link) {
    if (link.indexOf('http://') === -1 || link.indexOf('https://') === -1) link = 'http://' + link;
    Linking.openURL(link);
  }

  renderQRScanner() {
    return (
      <QRScanner exitScanner={(e) => {
        this.setState({showFindMatch: false, info: JSON.stringify(e)});
      }}/>
    )
  }

  renderQRCode() {
    const { showSignInQR } = this.state;
    const qrValue = showSignInQR ? "sign into event" : "create a match";
    const qrText = showSignInQR ? "Sign In" : "Create Match";

    return (
      <QRCodeComponent value={qrValue} 
        text={qrText}
        onClose={() => this.setState({ showSignInQR: false, showCreateMatchQR: false })}
      />
    );
  }

  render() {
    const { buttonStyle, eventSectionStyle, twoButtonStyle, eventInfoText } = styles;
    const { selectedEvent, signedInEvent } = this.props;
    const { showSignInQR, showCreateMatchQR, showFindMatch } = this.state;

    if (!selectedEvent) return null;
    if (showFindMatch) return this.renderQRScanner();
    if (showSignInQR || showCreateMatchQR) return this.renderQRCode(); 

    const rightIcon = signedInEvent === selectedEvent 
      ? { name: "sign-out", onPress: () => this.props.eventSignOut() } 
      // todo remove auto sign in
      : { name: "sign-in", onPress: () => {this.setState({ showSignInQR: true }); this.props.eventSignIn(selectedEvent) }};
    
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
                  onClick={() => this.setState({ showCreateMatchQR: true })} 
                />
                <Button text="Join Match" 
                  style={twoButtonStyle}
                  onClick={() => Actions.Set()} 
                />
              </View>
            }


            <View style={{ flex: 1, flexDirection: 'row' }}></View>
            <Button text="View Attendees" 
              style={buttonStyle}
              onClick={() => console.log("clicked a thingy") } 
            />

            {/* <Button
              text="crash app" 
              style={buttonStyle}
            /> */}

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

const mapStateToProps = ({ EventsReducer }) => {
  const { selectedEvent, signedInEvent } = EventsReducer;
  return { selectedEvent, signedInEvent };
}

export default connect(mapStateToProps, { eventSignIn, eventSignOut })(EventScreen);