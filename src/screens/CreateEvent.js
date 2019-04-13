import React, { Component } from 'react';
import { Image, View, ScrollView, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { BasePage, Button } from '../components';
import DatePicker from 'react-native-datepicker';
import { Icon } from 'react-native-elements';
import * as states from '../mockData/states.json';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { createEvent } from '../actions/EventActions';
import { Actions } from 'react-native-router-flux';
import faker from 'faker';

months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December']

defaultDay = new Date();
defaultStart = new Date();
defaultStart.setHours(16, 0);
defaultEnd = new Date();
defaultEnd.setHours(22, 0);

class CreateEvent extends Component {
  state = { 
    startDate: null, 
    startTime: null,
    endTime: null,
    address: '',
    region: [],
    timeFrames: [ {
      startDate: defaultDay,
      startTime: defaultStart,
      endTime: defaultEnd
    } ],
    name: '',
    description: '',
    tourneyLink: '',
    currentSection: 0
  };

  stateIds = states.default.map(state => state.id);

  headers = ['Create Event - Info', 'Create Event - Days', 'Create Event - Staff'];

  setDateTime(date, time1, time2, index = 0) {
    const timeFrameDays = [...this.state.timeFrames];

    if (date !== null) {
      const dateSplit = date.split(' ');
      const convertedDate = new Date(dateSplit[2], months.indexOf(dateSplit[0]), dateSplit[1].substring(0, dateSplit.length - 1))

      timeFrameDays.forEach((day, i) => {
        day.startDate = new Date(convertedDate);
        day.startDate.setDate(day.startDate.getDate() + i);
      });
    }
    if (time1 !== null) {
      timeSections = time1.split(':');

      const hours = timeSections[1].includes("am") ? timeSections[0] : 12 + Number(timeSections[0]);
      const minutes = timeSections[1].substr(0,2);
      const day = new Date(timeFrameDays[index].startDate)
      day.setHours(hours, minutes);
      timeFrameDays[index].startTime = day;
    }
    if (time2 !== null) {
      timeSections = time2.split(':');
      const hours = timeSections[1].includes("am") ? timeSections[0] : 12 + Number(timeSections[0]);
      const minutes = timeSections[1].substr(0,2);
      const day = new Date(timeFrameDays[index].startDate)
      day.setHours(hours, minutes);
      timeFrameDays[index].endTime = day;
    }
    this.setState({ timeFrames: timeFrameDays });
  }

  convertTimeFramesToTimeSlots() {
    return this.state.timeFrames.map(timeFrame => {
      const { startDate, startTime, endTime } = timeFrame
      const start = new Date(startDate)
      start.setHours(startTime.getHours(), startTime.getMinutes());
      const end = new Date(startDate)
      end.setHours(endTime.getHours(), endTime.getMinutes());
      return { start, end };
    });
  }

  async saveEvent() {
    const { name, description, tourneyLink, address } = this.state;
    const activeTimeSlots = this.convertTimeFramesToTimeSlots();
    const region = { id: this.state.region[0], region: states.default[this.stateIds.indexOf(this.state.region[0])].name };
    const eventData = {
      region, name, description, tourneyLink, activeTimeSlots, address
    }

    this.props.createEvent(eventData)
    Actions.Events();    
  }

  renderDayPicker(day, index) {
    const { inputStyle, labelStyle } = styles;
    if (index === 0) {
      return (
        <View>
          <Text style={labelStyle}>Event Start Day</Text>
          <DatePicker 
            androidMode='calendar'
            showIcon={false}
            date={day.startDate}
            format='MMMM Do YYYY'
            onDateChange={startDate => this.setDateTime(startDate, null, null, index)}
            mode='date'
            style={{ width: '100%' }}
            customStyles={{
              dateText: { color: 'white', fontSize: 14 },
              dateInput: inputStyle
            }}
            minDate={new Date()}
          />
        </View>
      );
    }


    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, width: '100%' }}>
        <Text style={labelStyle}>Day {index + 1}</Text>
        <Text style={labelStyle}>{day.startDate.toLocaleDateString()}</Text>
      </View>
    );
  }

  renderDateTimes() {
    const { inputStyle, labelStyle, dayStyle } = styles;
    const { timeFrames } = this.state;

    return timeFrames.map((day, i) => {
      return (
        <View style={dayStyle} key={i}>
          
          {this.renderDayPicker(day, i)}

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1, marginRight: 20, alignItems: 'center' }}>
              <Text style={labelStyle}>Event Start Time</Text>
              <DatePicker 
                is24Hour={false}
                showIcon={false}
                format="h:mm a"
                date={day.startTime} 
                onDateChange={startTime => this.setDateTime(null, startTime, null, i)}
                mode='time'
                customStyles={{
                  dateText: { color: 'white', fontSize: 18 },
                  dateInput: inputStyle
                }}
                style={{ width: '100%' }}
              />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={labelStyle}>Event End Time</Text>
              <DatePicker 
                is24Hour={false}
                showIcon={false}
                format="h:mm a"
                date={day.endTime} 
                onDateChange={endTime => this.setDateTime(null, null, endTime, i)}
                mode='time'
                customStyles={{
                  dateText: { color: 'white', fontSize: 18 },
                  dateInput: inputStyle
                }}
                style={{ width: '100%' }}
              />
            </View>
          </View>

          { i === timeFrames.length - 1 && timeFrames.length !== 1 &&
            <View style={{ position: 'absolute', top: 0, right: 0, marginTop: -10, marginRight: -10  }}>
              <Icon 
                color='white' 
                name='times-circle' 
                type='font-awesome' 
                onPress={() => this.setState({timeFrames: timeFrames.splice(0, timeFrames.length - 1)})}
              />
            </View>
          }
        </View>
      );
    });
  }

  renderSection() {
    const { inputStyle, labelStyle } = styles;
    const { name, description, tourneyLink, timeFrames, address } = this.state;

    switch(this.state.currentSection) {
      case 0: {
        return (
          <View>
            <View style={{ paddingBottom: 20 }}>
              <Text style={labelStyle}>Event Title</Text>
              <TextInput value={name} style={inputStyle} onChangeText={name => {console.log(name); this.setState({ name })} }/>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <Text style={labelStyle}>Address</Text>
              <TextInput
                value={address}
                style={inputStyle}
                onChangeText={address => this.setState({ address })}
              />
            </View>

            <View style={{ paddingBottom: 20, width: '100%' }}>
              <Text style={labelStyle}>Region</Text>
              <SectionedMultiSelect 
                uniqueKey='id' 
                items={states.default} 
                selectedItems={this.state.region} 
                selectText='Select Region'
                showChips={false}
                single={true}
                selectToggleIconComponent={<Icon name="chevron-down" type="font-awesome" color="white" size={16}/>}
                alwaysShowSelectText={false}
                onSelectedItemsChange={region => this.setState({ region })}
                styles={{ selectToggle: [{ height: 50, width: '100%' }, inputStyle], selectToggleText: { color: 'white', textAlign: 'center' } }}
              />
            </View>

            <View style={{ paddingBottom: 20 }}>
              <Text style={labelStyle}>Description</Text>
              <TextInput 
                value={description} 
                multiline 
                numberOfLines={4}
                style={inputStyle} 
                onChangeText={description => this.setState({description})}
              />
            </View>

            <View style={{ paddingBottom: 20 }}>
              <Text style={labelStyle}>Event Link</Text>
              <TextInput 
                value={tourneyLink}
                style={inputStyle} 
                onChangeText={tourneyLink => this.setState({tourneyLink})}
              />
            </View>
          </View>
        );
      }

      case 1: {
        return (
          <View>
            {this.renderDateTimes()}
            <Button 
              text='Add Day'
              style={{ marginTop: 15, marginBottom: 15 }}
              onClick={() => {
                const mostRecentDay = new Date(timeFrames[timeFrames.length - 1].startDate);
                const newStartDate = new Date(mostRecentDay.setDate(mostRecentDay.getDate() + 1));
                const newDayStart = new Date(newStartDate);
                const newDayEnd = new Date(newStartDate);

                newDayStart.setHours(timeFrames[0].startTime.getHours(), timeFrames[0].startTime.getMinutes());
                newDayEnd.setHours(timeFrames[0].endTime.getHours(), timeFrames[0].endTime.getMinutes());

                this.setState({timeFrames: [...timeFrames, { 
                  startDate: newStartDate, 
                  startTime: newDayStart, 
                  endTime: newDayEnd} ]
                });
              }} 
            />
          </View>
        );
      }

      case 2: {
        return (
          <View>
            <Text>Add Tournament Organizers</Text>
            <Text>Add Tournament Assistants</Text>
          </View>
        );
      }
    }
  }

  render() {
    const { currentSection } = this.state;
    const leftIcon = currentSection !== 0 
      ? { 
        name: 'angle-left', 
        onPress: () => this.setState({ currentSection: currentSection - 1 })
      } 
      : null;

    const rightIcon = currentSection !== 2 
      ? { 
        name: 'angle-right', 
        onPress: () => this.setState({ currentSection: currentSection + 1 })
      } : {
        name: 'save',
        onPress: () => this.saveEvent()
      };

    return (
      <BasePage leftIcon={leftIcon} rightIcon={rightIcon} headerText={this.headers[currentSection]}>
        <ScrollView style={{ height: '100%' }}>
          <View style={{ width: '80%', alignSelf: 'center' }}>
            {this.renderSection()}          
          </View>
        </ScrollView>
      </BasePage>
    );
  }
}

styles = {
  labelStyle: {
    fontSize: 16,
    color: 'white',
  },
  inputStyle: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    color: 'white',
    backgroundColor: '#2f3136',
    padding: 10,
    paddingLeft: 10,
    fontSize: 16
  },
  switchStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  dayStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#4c4f54',
    padding: 10,
    marginTop: 5,
    marginBottom: 5
  }
};

export default connect(null, { createEvent })(CreateEvent);