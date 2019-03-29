import React, { Component } from 'react';
import { View, Text } from 'react-native';


class EventView extends Component {

  render() {
    const { eventStyle, eventTextStyle } = styles;
    const { event } = this.props;

    return (
      <View style={eventStyle}>
        <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={eventTextStyle}>{event.name}</Text>
          <Text style={eventTextStyle}>{event.region.region}</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={eventTextStyle}>{event.activeTimeslots[0].start.toLocaleDateString()} - </Text>
          <Text style={eventTextStyle}>{event.activeTimeslots[0].end.toLocaleDateString()}</Text>
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
    borderRadius: 5
  },
  eventTextStyle: {
    fontSize: 14,
    color: '#cccccc'
  }
}

export { EventView };