import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { View, Text, ScrollView, Picker } from 'react-native';
import { Dropdown } from '../components';
import { getEvents } from '../actions/EventActions';
import * as states from '../mockData/states.json';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

class Events extends Component {

  state = { timeFrame: 'All', selectedRegions: [] };

  timeFrames = [
    { id: "0", name: "Today" }, 
    { id: "1", name: "This Week" }, 
    { id: "2", name: "This Month" },
    { id: "3", name: "All" } 
  ];

  componentDidMount() {
    this.props.getEvents();
    console.log('events')
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
    return (
      <View style={eventsPage}>
        <Text style={headerStyle}>Events</Text>

        <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10, justifyContent: 'space-around', marginBottom: 10 }}>

          <SectionedMultiSelect 
            uniqueKey="id" 
            items={this.timeFrames} 
            selectedItems={this.state.timeFrame} 
            selectText="Time Frame"
            showChips={false}
            single={true}
            onSelectedItemsChange={(items) => this.setState({timeFrame: items})}
            styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5 }, selectToggleText: { color: 'white', textAlign: 'center' }, container: { height: 'auto' } }}          
          />

          <SectionedMultiSelect 
            uniqueKey="id" 
            items={states.default} 
            selectedItems={this.state.regions} 
            selectText="Regions"
            showChips={false}
            alwaysShowSelectText={true}
            onSelectedItemsChange={(items) => this.setState({regions: items})}
            styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5 }, selectToggleText: { color: 'white', textAlign: 'center' } }}
            />
          {/* <Dropdown
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
          /> */}
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
    width: '100%',
    backgroundColor: '#36393f'
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