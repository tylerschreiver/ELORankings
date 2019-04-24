import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { BasePage } from '../components';
import { getLeaderboard } from '../actions/UsersActions';
import { Image } from 'react-native-elements';
import characters from '../assets/getCharacters';
import SearchBar from 'react-native-searchbar';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import * as states from '../mockData/states.json';
import { Actions } from 'react-native-router-flux';

class Leaderboard extends Component {
  state = { 
    filteredRanks: [], 
    filterText: '', 
    selectedRegions: [], 
    selectedCharacters: [] 
  };

  charactersSearch = Object.keys(characters).map(char => { return { name: char } });
  stateIds = states.default.map(state => state.id);

  searchBar = null;

  async componentDidMount() {
    await this.props.getLeaderboard();
    this.setState({ filteredRanks: this.props.leaderboard });
  }

  filter(text, regions, characters) {
    let filteredRanks = this.props.leaderboard;

    const filterText = text === null ? this.state.filterText : text;
    const selectedRegions = regions === null ? this.state.selectedRegions : regions;
    const selectedCharacters = characters === null ? this.state.selectedCharacters : characters;

    if (filterText !== null && filterText !== '') {
      filteredRanks = filteredRanks.filter(rank => rank.username.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    } 

    if (selectedRegions !== null && selectedRegions.length !== 0) {
      // this.setState({ selectedRegions });
      filteredRanks = filteredRanks.filter(rank => {
        return selectedRegions.indexOf(states.default[this.stateIds.indexOf(rank.region)].name) !== -1;
      });
    }

    if (selectedCharacters !== null && selectedCharacters.length !== 0) {
      // this.setState({ selectedCharacters });
      filteredRanks = filteredRanks.filter(rank => {
        let isCharInRank = false
        rank.characters.forEach(char => {
          if (selectedCharacters.indexOf(char) !== -1) isCharInRank = true;
        });
        return isCharInRank;
      });
    }

    this.setState({ filteredRanks, filterText, selectedRegions, selectedCharacters });
  }

  renderCharacters(rank) {
    return rank.characters.map(char => {
      const icon = characters[char];
      return (
        <Image 
          style={{ marginLeft: 5, marginRight: 5 }} 
          key={char} 
          source={icon} 
        />
      );
    });
  }

  renderUsers() {
    const { userStyle, userTextStyle, userEvenStyle } = styles;
    return this.state.filteredRanks.map((user, i) => {
      const rowStyles = i % 2 === 0 ? [userStyle, userEvenStyle] : [userStyle];
      return (
        <View onTouchEnd={() => Actions.Profile()} key={user.id} style={rowStyles}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Text style={userTextStyle}>{i+1}) {user.username}</Text>
            {this.renderCharacters(user)}
          </View>
          <Text style={{ ...userTextStyle, flex: 1 }}>{states.default[this.stateIds.indexOf(user.region)].name}</Text>
          <Text style={{ fontSize: 16, color: 'white' }}>{user.eloScore}</Text>
        </View>
      );
    });
  }

  render() {
    const rightIcon = { name: 'search', onPress: () => this.searchBar.show() };
    const { shadowStyle } = styles;

    return (
      <BasePage rightIcon={rightIcon} headerText="Leaderboard">
        <View style={{ position: 'absolute', top: 0, width: '100%', height: 50 }}>
          <SearchBar 
            ref={ref => this.searchBar = ref} 
            handleChangeText={text => this.filter(text, null, null)}
            clearOnHide={false}
            onBlur={() => { if (this.state.filterText === '') this.searchBar.hide(); }}
          />
        </View>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
              <View style={shadowStyle}>
                <SectionedMultiSelect
                  uniqueKey="name" 
                  items={states.default} 
                  selectedItems={this.state.selectedRegions} 
                  selectText="Regions"
                  showChips={false}
                  onSelectedItemsChange={regions => this.filter(null, regions, null)}
                  styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5}, selectToggleText: { color: 'white', textAlign: 'center' } }}
                />
              </View>
              <View style={shadowStyle}>
                <SectionedMultiSelect
                  uniqueKey="name" 
                  items={this.charactersSearch} 
                  selectedItems={this.state.selectedCharacters} 
                  selectText="Characters"
                  showChips={false}
                  onSelectedItemsChange={chars => this.filter(null, null, chars)}
                  styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5}, selectToggleText: { color: 'white', textAlign: 'center' } }}
                />
              </View>
            </View>
            {this.renderUsers()}
          </View>
        </ScrollView>
      </BasePage>
    );
  }
}

const styles = {
  userStyle: {
    width: '100%',
    backgroundColor: '#4c4f54',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userEvenStyle: {
    backgroundColor: '#3d3f43'
  },
  userTextStyle: {
    color: 'white',
    fontSize: 16,
    marginRight: 10
  },
  shadowStyle: {
    backgroundColor: 'rebeccapurple',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8
  }
}


mapStateToProps = ({ UsersReducer }) => {
  const { users, leaderboard } = UsersReducer;
  return { users, leaderboard };
}

export default connect(mapStateToProps, { getLeaderboard })(Leaderboard);