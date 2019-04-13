import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { View, ScrollView, Text } from 'react-native';

import { getEvents } from '../actions/EventActions';
import * as states from '../mockData/states.json';
import { EventView, Header } from '../components'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Actions } from 'react-native-router-flux';

class Events extends Component {

  state = { timeFrame: ['All'], regions: [], filteredEvents: [] };

  dates = {
    today: new Date(),
    week: new Date(),
    month: new Date()
  };

  hasChecked = false;

  timeFrames = [
    { id: "0", name: "Today" }, 
    { id: "1", name: "This Week" }, 
    { id: "2", name: "This Month" },
    { id: "3", name: "All" }
  ];

  componentDidMount() {
    const today = new Date();
    const dayLength = 24 * 60 * 60 * 1000;
    this.dates.today = new Date(today.getTime() + dayLength);
    this.dates.week = new Date(today.getTime() + dayLength * 7);
    this.dates.month = new Date(today.getTime() + dayLength * 30);
    
    this.filter(null, null);
  }

  async componentDidUpdate(props) {
    const { regions, timeFrame } = this.state;
    if (props.events !== this.props.events) {
      const timeFrameNames = this.timeFrames.map(t => t.name);
      await this.filter(regions, [timeFrameNames.indexOf(timeFrame[0]).toString()]);
    }
  }

  getRegionName(id) {
    for (let key in states) {
      if (states[key].id === id) return states[key].name;
    }
  }
  
  isInTimeFrame(event, timeFrame) {
    const time = new Date(event.activeTimeSlots[0]['end'].toLocaleDateString());
    switch (timeFrame) {
      case 'All': return true;
      case 'This Month': return this.dates.month.getTime() > time.getTime();
      case 'This Week': return this.dates.week.getTime() > time.getTime();
      case 'Today': return this.dates.today.getTime() > time.getTime();
    }
  }
  
  filter(regions, timeFrameId) {
    let filteredEvents = this.props.events;
    
    if (timeFrameId !== null) {
      let timeFrame = [this.timeFrames[timeFrameId].name];
      if (timeFrame[0] !== this.state.timeFrame[0]) this.setState({ timeFrame });
      filteredEvents = filteredEvents.filter((event) => this.isInTimeFrame(event, timeFrame[0]));
    }
    
    if (regions !== null && regions.length > 0) {
      this.setState({regions})
      let selectedRegionNames = regions.map((region) => this.getRegionName(region));
      filteredEvents = filteredEvents.filter((event) => {
        let eventRegion = event.region.region;
        return selectedRegionNames.indexOf(eventRegion) !== -1;
      });
    }
    
    this.setState({ filteredEvents });
  }

  renderEvents() {
    if (this.state.filteredEvents.length === 0) return null;    
    else {
      return this.state.filteredEvents.map(event => {
        return <EventView event={event} key={event.id} />;
      });
    }
  }
  
  render() {
    const { eventsPage, shadowStyle } = styles;
    return (
      <View style={eventsPage}>
        <Header headerText="Events" rightIcon={{ name: "plus", onPress: () => Actions.CreateEvent() }}/>

        <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10, justifyContent: 'space-around', marginBottom: 10 }}>

        <View style={shadowStyle}>
            <SectionedMultiSelect 
              uniqueKey="id" 
              items={this.timeFrames} 
              selectedItems={this.state.timeFrame} 
              selectText="Time Frame"
              showChips={false}
              single={true}
              onSelectedItemsChange={(timeFrame) => this.filter(null, timeFrame)}
              styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5}, selectToggleText: { color: 'white', textAlign: 'center' } }}          
            />
          </View>
          <View style={shadowStyle}>
            <SectionedMultiSelect 
              uniqueKey="id" 
              items={states.default} 
              selectedItems={this.state.regions} 
              selectText="Regions"
              showChips={false}
              alwaysShowSelectText={true}
              onSelectedItemsChange={regions => this.filter(regions, null)}
              styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5}, selectToggleText: { color: 'white', textAlign: 'center' } }}
            />
          </View>
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
  },
  shadowStyle: {
    backgroundColor: 'rebeccapurple',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8
  },
  space: {
    marginBottom: 15
  }
}

const mapStateToProps = ({ EventsReducer }) => {
  const { events } = EventsReducer;
  return { events };
}

export default connect(mapStateToProps, { getEvents })(Events);