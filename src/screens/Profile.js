import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getPlayerRanks } from '../actions/UsersActions';
import { connect } from 'react-redux';
import { BasePage } from '../components';

class Profile extends Component {
  playerRanks = [];

  UNSAFE_componentWillMount() {
    const { viewedUser, currentUser, getPlayerRanks } = this.props;
    const user = viewedUser !== null ? viewedUser : currentUser;
    this.playerRanks = getPlayerRanks(user);
  }

  renderTag() {
    return null;
  }

  renderRanks() {
    return this.playerRanks.map(rank => {
      return (
        <View>
          
        </View>
      );
    });
  }

  renderRegion(user) {
    const { textStyle, headingStyle } = styles;
    return (
      <View>
        <Text style={headingStyle}>Region</Text>
        <Text style={textStyle}>{user.region}</Text>
      </View>
    );
  }

  renderSubregion(user) {
    const { textStyle, headingStyle } = styles;
    if (user.subregion) {
      return (
        <View>
          <Text style={headingStyle}>Subregion</Text>
          <Text style={textStyle}>{user.subregion}</Text>
        </View>
      );
    } else return null;
  }

  render() {
    const { viewedUser, currentUser } = this.props;
    const user = viewedUser !== null ? viewedUser : currentUser;
    const { infoStyle } = styles;
    return (
      <BasePage headerText={user.username + "'s Profile"}>
        <ScrollView>
          <View style={{ width: '80%', alignSelf: 'center' }}>
            {this.renderTag()}
            <View style={infoStyle}>
              {this.renderSubregion(user)}
              {this.renderSubregion(user)}
            </View>
            {this.renderRanks()}
          </View>
        </ScrollView>
      </BasePage>
    );
  }
}

const styles = {
  headingStyle: {
    fontSize: 18,
    color: 'white'
  },
  textStyle: {
    fontSize: 16,
    color: 'white'
  },
  tagStyle: {
    fontSize: 30,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    color: 'white',
    marginBottom: 10
  },
  infoStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around'
  }
};

const mapStateToProps = ({ UsersReducer }) => {
  const { viewedUser, currentUser } = UsersReducer;
  return { viewedUser, currentUser };
}

export default connect(mapStateToProps, { getPlayerRanks })(Profile);