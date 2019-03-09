import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { View, Text, ScrollView } from 'react-native';
import { Dropdown } from '../components';
import { getEvents } from '../actions/EventActions';

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

  componentDidMount() {
    this.props.getEvents();
  }

  renderEvents() {
    const { eventStyle } = styles;
    if (!this.props.events) return null;
    else {
      return this.props.events.map((event) => {
        return (
          <View style={eventStyle} key={event.id}>
            <Text style={{ color: '#cccccc' }}>{event.name}</Text>

          </View>
        );
      })
    }
  }

  render() {
    const { eventSection, eventsPage, headerStyle } = styles;
    console.log(this.props);
    return (
      <View style={eventsPage}>
        <Text style={headerStyle}>Events</Text>

        <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10, justifyContent: 'space-around', marginBottom: 10 }}>
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

        <ScrollView>
          {this.renderEvents()}
        </ScrollView>



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
  },
  eventStyle: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#4c4f54",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5
  }
}

const mapStateToProps = ({ EventsReducer }) => {
  return { events: EventsReducer.events.events };
}

export default connect(mapStateToProps, { getEvents })(Events);