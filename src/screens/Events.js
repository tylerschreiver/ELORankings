import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { View, Text, ScrollView, Picker } from 'react-native';
import { getEvents } from '../actions/EventActions';
import * as states from '../mockData/states.json';
import { EventView } from '../components'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

class Events extends Component {

  state = { timeFrame: ['All'], regions: [], filteredEvents: [] };

  dates = {
    today: new Date(),
    week: new Date(),
    month: new Date()
  }

  hasChecked = false;

  timeFrames = [
    { id: "0", name: "Today" }, 
    { id: "1", name: "This Week" }, 
    { id: "2", name: "This Month" },
    { id: "3", name: "All" }
  ];

  componentDidMount() {
    this.props.getEvents();

    const today = new Date();
    const dayLength = 24 * 60 * 60 * 1000;
    this.dates.today = new Date(today.getTime() + dayLength);
    this.dates.week = new Date(today.getTime() + dayLength * 7);
    this.dates.month = new Date(today.getTime() + dayLength * 30);
  }

  componentDidUpdate(props) {
    const { filteredEvents, regions, timeFrame } = this.state;
    if (filteredEvents.length === 0 && regions.length === 0 && timeFrame[0] === 'All') {
      this.setState({ filteredEvents: props.events });
    }
  }

  renderEvents() {
    if (this.state.filteredEvents.length === 0) return null;

    else {
      return this.state.filteredEvents.map((event) => {
        return <EventView event={event} key={event.id} />;
      });
    }
  }

  getRegionName(id) {
    for (let key in states) {
      if (states[key].id === id) return states[key].name;
    }
  }

  isInTimeFrame(event, timeFrame) {
    const time = new Date(event.activeTimeslots[0]['end'].toLocaleDateString());
    switch (timeFrame) {
      case 'All': return true;
      case 'This Month': return this.dates.month.getTime() > time.getTime();
      case 'This Week': return this.dates.week.getTime() > time.getTime();
      case 'Today': return this.dates.today.getTime() > time.getTime();
    }
  }

  filter(regions, timeFrameId) {
    let filteredEvents = this.state.timeFrame || this.state.regions 
      ? this.state.filteredEvents 
      : this.props.events;
      
    if (timeFrameId !== null) {
      let timeFrame = [this.timeFrames[timeFrameId].name];
      this.setState({ timeFrame });
      filteredEvents = filteredEvents.filter((event) => this.isInTimeFrame(event, timeFrame[0]));
    }
    
    if (regions !== null) {
      this.setState({regions})
      let selectedRegionNames = regions.map((region) => this.getRegionName(region));
      filteredEvents = filteredEvents.filter((event) => {
        let eventRegion = event.region.region;
        return selectedRegionNames.indexOf(eventRegion) !== -1;
      });
    }

    this.setState({ filteredEvents });
  }

  render() {
    const { eventsPage, headerStyle } = styles;
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
            onSelectedItemsChange={(timeFrame) => this.filter(null, timeFrame)}
            styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5 }, selectToggleText: { color: 'white', textAlign: 'center' }, container: { height: 'auto' } }}          
          />

          <SectionedMultiSelect 
            uniqueKey="id" 
            items={states.default} 
            selectedItems={this.state.regions} 
            selectText="Regions"
            showChips={false}
            alwaysShowSelectText={true}
            onSelectedItemsChange={(regions) => this.filter(regions, null)}
            styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5 }, selectToggleText: { color: 'white', textAlign: 'center' } }}
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