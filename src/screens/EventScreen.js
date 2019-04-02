import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux'; 

import { BasePage, Button, QRCodeComponent } from '../components';

class EventScreen extends Component {

  state = { showSignInQR: false, showCreateMatchQR: false };

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
    const { buttonStyle, eventSectionStyle } = styles;
    const { selectedEvent } = this.props;
    const { showSignInQR, showCreateMatchQR } = this.state;

    if (!selectedEvent) return null;
    if (showSignInQR || showCreateMatchQR) return this.renderQRCode(); 

    return (
      <BasePage headerText={selectedEvent.name}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Button onClick={() => this.setState({ showSignInQR: true })} 
            text="Sign In / Leave Event" 
            style={buttonStyle} 
          />
          
          <View style={eventSectionStyle}>
            <Text>Event Info</Text>
            <Text>Location</Text>
            <Text>Link</Text>
          </View>

          <Button text="Create Match" 
            style={buttonStyle}
            onClick={() => this.setState({ showCreateMatchQR: true })} 
          />

          <Button text="View Attendees" 
            style={buttonStyle}
            onClick={() => console.log("clicked a thingy") } 
          />

          <Button text="TO's and Assistants" 
            style={buttonStyle}
            onClick={() => console.log("clicked a thingy") } 
          />
        </View>
      </BasePage>
    );
  }
}

const mapStateToProps = ({ EventsReducer }) => {
  const { selectedEvent } = EventsReducer;
  return { selectedEvent };
}

const styles = {
  buttonStyle: {
    width: '80%',
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
    borderRadius: 5
  }
}


export default connect(mapStateToProps)(EventScreen);