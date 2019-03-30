import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux'; 

import { BasePage, Button } from '../components';

class EventScreen extends Component {

  componentDidMount() {
  }

  render() {
    const { buttonStyle, eventSectionStyle } = styles;
    const { selectedEvent } = this.props;
    if (!selectedEvent) return null;
    return (
      <BasePage headerText={selectedEvent.name}>
        <View style={{ alignItems: 'center' }}>
          <Button text="Sign in / Leave Event" style={buttonStyle} />
          <View style={eventSectionStyle}>
            <Text>Event Info</Text>
            <Text>Location</Text>
            <Text>Link</Text>
          </View>
        </View>
        <Button text="Create Match" style={buttonStyle} />
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
    margin: 'auto'
  },
  eventSectionStyle: {
    width: '80%',
    margin: 'auto',
    backgroundColor: '#4c4f54',
    borderWidth: 1,
    bordedrColor: 'black',
    borderRadius: 5,
    marginTop: 20
  }
}


export default connect(mapStateToProps)(EventScreen);