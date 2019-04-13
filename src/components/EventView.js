import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { View, Text } from 'react-native';
import { setSelectedEvent } from '../actions/EventActions';
import { Actions } from 'react-native-router-flux';


class EventViewComponent extends Component {

  selectEvent() {
    this.props.setSelectedEvent(this.props.event);
    Actions.EventScreen();
  }

  render() {
    const { eventStyle, eventTextStyle } = styles;
    const { event } = this.props;
    return (
      <View onTouchEnd={() => this.selectEvent()} style={eventStyle}>
        <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={eventTextStyle}>{event.name}</Text>
          <Text style={eventTextStyle}>{event.region.region}</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={eventTextStyle}>{event.activeTimeSlots[0].start.toLocaleDateString()} - </Text>
          <Text style={eventTextStyle}>{event.activeTimeSlots[0].end.toLocaleDateString()}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  eventStyle: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#4c4f54',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8
  },
  eventTextStyle: {
    fontSize: 14,
    color: '#cccccc'
  }
}

const EventView = connect(null, { setSelectedEvent })(EventViewComponent)
export { EventView };