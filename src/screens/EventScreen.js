import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux'; 

import { BasePage, Button, QRCodeComponent, QRScanner } from '../components';
import { Actions } from 'react-native-router-flux';

class EventScreen extends Component {

  state = { showSignInQR: false, showCreateMatchQR: false, showFindMatch: false, info: "" };


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
    const { buttonStyle, eventSectionStyle, twoButtonStyle } = styles;
    const { selectedEvent } = this.props;
    const { showSignInQR, showCreateMatchQR, showFindMatch } = this.state;

    if (!selectedEvent) return null;
    if (showFindMatch) return this.renderQRScanner();
    if (showSignInQR || showCreateMatchQR) return this.renderQRCode(); 

    return (
      <BasePage headerText={selectedEvent.name}>
        <ScrollView>
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

            <View style={{ flex: 1, flexDirection: 'row', width: '80%', height: 'auto', justifyContent: 'space-between' }}>
              <Button text="Create Match" 
                style={twoButtonStyle}
                onClick={() => this.setState({ showCreateMatchQR: true })} 
              />
              {/* <Button text="Join Match" 
                style={twoButtonStyle}
                onClick={() => this.setState({ showFindMatch: true })} 
              /> */}
              <Button text="Join Match" 
                style={twoButtonStyle}
                onClick={() => Actions.Set()} 
              />
            </View>


            <View style={{ flex: 1, flexDirection: 'row' }}></View>
            <Button text="View Attendees" 
              style={buttonStyle}
              onClick={() => console.log("clicked a thingy") } 
            />

            <Button
              text="crash app" 
              // text="TO's and Assistants" 
              style={buttonStyle}
              // onClick={() => console.log("clicked a thingy") } 
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
    borderRadius: 5
  }
}

const mapStateToProps = ({ EventsReducer }) => {
  const { selectedEvent } = EventsReducer;
  return { selectedEvent };
}

export default connect(mapStateToProps)(EventScreen);