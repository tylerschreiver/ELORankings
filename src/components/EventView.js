import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { View, Text } from 'react-native';
import { setSelectedEvent } from '../actions/EventActions';
import { Actions } from 'react-native-router-flux';
import * as states from '../mockData/states.json';

class EventViewComponent extends Component {
  stateIds = states.default.map(state => state.id);

  selectEvent() {
    this.props.setSelectedEvent(this.props.event);
    Actions.EventScreen();
  }

  renderTimeFrame() {
    const { eventTextStyle } = styles;
    const startDate = new Date(JSON.parse(this.props.event.timeFrame.start));
    const endDate = new Date(JSON.parse(this.props.event.timeFrame.end));
    const isSameDay = (
      startDate.getDate() === endDate.getDate() && 
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    );
    if (isSameDay) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={eventTextStyle}>{startDate.toLocaleDateString()}: </Text>
          <Text style={eventTextStyle}>{startDate.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit'})} -</Text>
          <Text style={eventTextStyle}>{endDate.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit'})}</Text>

        </View>
      );
    } 
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={eventTextStyle}>{startDate.toLocaleDateString()} - </Text>
        <Text style={eventTextStyle}>{endDate.toLocaleDateString()}</Text>
      </View>
    );
  }

  render() {
    const { eventStyle, eventTextStyle } = styles;
    const { event } = this.props;
    const stateName = states.default[this.stateIds.indexOf(event.regionId)].name;
    
    return (
      <View onTouchEnd={() => this.selectEvent()} style={eventStyle}>
        <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={eventTextStyle}>{event.name}</Text>
          <Text style={eventTextStyle}>{stateName}</Text>
        </View>
        { event && event.timeRange &&        
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={eventTextStyle}>{event.timeRange.start} - </Text>
            <Text style={eventTextStyle}>{event.timeRange.end}</Text>
          </View>
        }
        {this.renderTimeFrame()}
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