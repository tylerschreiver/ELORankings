import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from '../components';

class Events extends Component {

  state = { timeFrame: 'Today', selectedRegions: [] };

  timeFrames = [
    { key: "0", name: "Today" }, 
    { key: "1", name: "This Week" }, 
    { key: "2", name: "This Month" },
    { key: "3", name: "All" } 
  ];

  regions = [
    { key: 0, name: "Kentucky" },
    { key: 1, name: "Ohio" },
    { key: 2, name: "Indiana" }
  ];

  render() {
    const { eventSection, eventsPage, headerStyle } = styles;
    console.log(this.state);
    return (
      <View style={eventsPage}>
        <Text style={headerStyle}>Events</Text>

        <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10, justifyContent: 'space-around' }}>
          <Dropdown
            placeholder="Time Frame"
            items={this.timeFrames}
            multiselect={false}
            dropdownStyle={{ width: 120 }}
            onChange={(tf) => this.setState({ timeFrame: tf })}
          />
          <Dropdown
            placeholder="Region"
            items={this.regions}
            multiselect={true}
            dropdownStyle={{ width: 120 }}
            onChange={(sr) => this.setState({ selectedRegions: sr })}
          />
        </View>


      </View>
    );
  }
}

const styles = {
  eventsPage: {
    flex: 1,
    width: '100%'
  },
  headerStyle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15
  },
  eventSection: {
    margin: 10,
    padding: 10
  }
}

export default Events;