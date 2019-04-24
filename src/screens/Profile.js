import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import { removeViewedUser, getUserById, getPlayerRanks, updateUser } from '../actions/UsersActions';
import { connect } from 'react-redux';
import { BasePage } from '../components';
import characters from '../assets/getCharacters';
import { Actions } from 'react-native-router-flux';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import * as states from '../mockData/states.json';

rankNames = ["Primary", "Secondary", "Third", "Fourth", "Fifth"];

class Profile extends Component {
  state = { playerRanks: [], editMode: false, editUser: {}, user: {} };
  rightIcon = null;
  leftIcon = null;
  stateIds = states.default.map(state => state.id);
  stateNames = states.default.map(state => state.name);

  async UNSAFE_componentWillMount() {
    const { viewedUser, currentUser, getUserById, getPlayerRanks } = this.props;
    // if (!leaderboard || !leaderboard.length) await getLeaderboard();
    let user = {}
    let playerRanks = [];
    if (viewedUser !== null) {
      user = await getUserById(viewedUser.userId);
      playerRanks = await getPlayerRanks(user.id);
      this.leftIcon = { name: 'arrow-left', onPress: () => Actions.pop() };
      
    } else {
      user = currentUser;
      playerRanks = await getPlayerRanks(user.id);
      this.rightIcon = { name: 'edit', onPress: () => this.enterEditMode()}
    }

    // const playerRanks = user && user.ranks ? user.ranks : [];
    this.setState({ playerRanks, user });
  }

  UNSAFE_componentWillUpdate(nextProps) {
    const { viewedUser, currentUser, getUserById } = this.props;
    if (viewedUser !== nextProps.viewedUser) {
      const user = viewedUser !== null ? getUserById(viewedUser) : currentUser;
      this.setState({user});
    }
  }

  enterEditMode() {
    const regionName = states.default[this.stateIds.indexOf(this.state.user.regionId)].name;
    this.setState({ editMode: true, editUser: { region: [regionName], subregion: this.state.user.subregion } });
    this.rightIcon = { name: 'save', onPress: () => this.save() };
    this.leftIcon = { name: 'times', onPress: () => this.cancelEdit() };
  }

  async save() {
    const userUpdate = { ...this.state.user };
    userUpdate.regionId = states.default[this.stateNames.indexOf(this.state.editUser.region[0])].id;
    userUpdate.subregion = this.state.editUser.subregion;

    await this.props.updateUser(userUpdate);
    console.log('after');

    this.setState({ editMode: false });
    this.leftIcon = null;
    this.rightIcon = { name: 'edit', onPress: () => this.enterEditMode()}
  }
  
  cancelEdit() {
    this.setState({ editMode: false });
    this.leftIcon = null;
    this.rightIcon = { name: 'edit', onPress: () => this.enterEditMode()}
  }

  renderTag() {
    return null;
  }

  renderImages(rank) {
    const { textStyle, flexStyle, flexEndStyle } = styles;
    // return rank.characters.map((character, i) => {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'space-between', width: '100%' }} key={rank.character}>
          <View style={flexStyle}>
            <Text style={textStyle}>{rank.character}</Text>
          </View>

          <Image source={characters[rank.character]} />
        </View>
      );
    // });
  }

  renderRanks() {
    if (this.state.editMode || !this.state.playerRanks || !this.state.playerRanks.length) return null;

    const { rankStyle, textStyle, flexEndStyle } = styles;
    return this.state.playerRanks.map((rank, i) => {
      console.log(rank);
      return (
        <View key={i} style={rankStyle}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }} key={rank.id}>
            <Text style={textStyle}>{rankNames[i]} Rank</Text>
            <View style={flexEndStyle}>
              <Text style={textStyle}>
                {rank.position + 1} / {this.props.totalPeople}
              </Text>
            </View>
          </View>
          <View style={{ width: '100%' }}>
            {this.renderImages(rank)}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
            <Text style={textStyle}>ELO Score: {Math.floor(rank.eloScore)}</Text>
          </View>
        </View>
      );
    });
  }

  renderRegion(user) {
    const { textStyle, regionStyle, inputStyle } = styles;
    if (user && user.regionId) {
      if (this.state.editMode) {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'space-around', width: '100%' }}>
            <View style={{ alignItems: 'center', flex: 1, marginRight: 10 }}>
              <Text style={textStyle}>Region</Text>
              <SectionedMultiSelect
                uniqueKey="name" 
                items={states.default} 
                selectedItems={this.state.editUser.region}
                single={true}
                showChips={false}
                onSelectedItemsChange={regions => this.setState({ editUser: { ...this.state.editUser, region: regions }})}
                styles={{ selectToggle: [{ height: 50, width: '100%' }, inputStyle], selectToggleText: { color: 'white', textAlign: 'center' } }}
              />
            </View>

            <View style={{ alignItems: 'center', flex: 1, marginLeft: 10 }}>
              <Text style={textStyle}>Subregion</Text>
              <TextInput
                value={this.state.editUser.subregion} 
                onChangeText={text => this.setState({ editUser: { ...this.state.editUser, subregion: text }})}
                style={inputStyle} 
              />
            </View>
          </View>
        );
      } else {
        const regionName = states.default[this.stateIds.indexOf(user.regionId)].name;
        const regionString = user.subregion ? regionName + ' - ' + user.subregion : regionName;
        return (
          <View style={regionStyle}>
            <Text style={textStyle}>{regionString}</Text>
          </View>
        );
      }
    } else return null;
  }

  render() {
    const { headingStyle, rankSectionStyle } = styles;

    if (!this.state.user) return null;
    return (
      <BasePage 
        rightIcon={this.rightIcon} 
        leftIcon={this.leftIcon} 
        headerText={this.state.user.displayName + "'s Profile"}
      >
        <ScrollView>
          <View style={{ width: '80%', alignSelf: 'center' }}>
            {this.renderTag()}

            <Text style={headingStyle}>Region</Text>
            <View style={rankSectionStyle}>
              {this.renderRegion(this.state.user)}
            </View>

          { !this.state.editMode && <Text style={headingStyle}>Rankings</Text> }
            <View style={rankSectionStyle}>
              {this.renderRanks()}
            </View>
          </View>
        </ScrollView>
      </BasePage>
    );
  }
}

const styles = {
  headingStyle: {
    fontSize: 18,
    color: 'white',
    width: '100%',
    borderBottomWidth: 2,
    paddingBottom: 5,
    borderBottomColor: 'black',
    marginBottom: 10,
    marginBottom: 10,
  },
  flexStyle: {
    flex: 1
  },
  flexEndStyle: {
    flex: 1,
    alignItems: 'flex-end'
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
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
    justifyContent: 'center',
    marginBottom: 20
  },
  rankStyle: {
    width: '100%',
    backgroundColor: '#4c4f54',
    padding: 10,
    marginBottom: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5
  },
  regionStyle: { 
    flex: 1, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    marginTop: 10, 
    marginBottom: 10
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
  }
};

const mapStateToProps = ({ UsersReducer }) => {
  const { viewedUser, currentUser, leaderboard } = UsersReducer;
  return { viewedUser, currentUser, totalPeople: leaderboard.length };
}

export default connect(mapStateToProps, { removeViewedUser, getUserById, getPlayerRanks, updateUser })(Profile);