import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux'; 
import { Actions } from 'react-native-router-flux';

import { signOut } from '../actions/AuthActions'
import { setSelectedEvent } from '../actions/EventActions';


class SideMenuContentComponent extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.viewedEvents !== nextProps.viewedEvents;
  }

  selectEvent(event) {
    console.log('select')
    this.props.setSelectedEvent(event);
    Actions.EventScreen();
  }

  renderViewedEvents() {
    if (!this.props.viewedEvents || this.props.viewedEvents.length === 0) return null;
    return this.props.viewedEvents.map(event => {
      return (
        <View key={event.id} onTouchEnd={() => this.selectEvent(event)} style={styles.viewedEventStyle}>
          <Text style={{ color: 'white', fontSize: 14 }}>{event.name}</Text>
        </View>
      );
    });
  }

  render() {
    const { menuStyle, logoutStyle, logoutWrapperStyle, headingStyle } = styles;
    return (  
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={menuStyle} scrollsToTop={false}>
        <View style={{ flex: 1 }}>

          <View>
            <Text style={headingStyle}>Recently Viewed Events</Text>
            <View onTouchEnd={() => console.log("woeijf")} style={{ height: 'auto', flex: 1, borderColor: 'white', borderWidth: 1, borderRadius: 5 }}>
              {this.renderViewedEvents()}
            </View>
          </View>


          <View onTouchEnd={() => this.props.signOut()} style={logoutWrapperStyle}>
            <Text style={logoutStyle}>Logout</Text>
          </View>
        </View>
      </ScrollView>

    );
  }
}

const styles = {
  menuStyle: {
    backgroundColor: '#202225',
    height: '100%',
    paddingTop: 30,
    display: 'flex',
    flex: 1,
    flexDiretion: 'column'
  },
  logoutWrapperStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'white',
  },
  logoutStyle: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  headingStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    minHeight: 14,
  },
  viewedEventStyle: {
    minHeight: 34,
    backgroundColor: '#4c4f54',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: '100%',
    height: 'auto',
    alignItems: 'center'
  }
}


const mapStateToProps = ({ EventsReducer }) => {
  return { viewedEvents: EventsReducer.viewedEvents }
};

const SideMenuContent = connect(mapStateToProps, { signOut, setSelectedEvent })(SideMenuContentComponent);
export { SideMenuContent };