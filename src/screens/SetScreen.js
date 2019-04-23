import React, { Component } from 'react';
import { Image, View, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { 
  banStage, 
  resetBannedStages, 
  setGameWin, 
  setOpponent, 
  setBestOf, 
  setStage, 
  init, 
  chooseRankedSlot, 
  setCharacter 
} from '../actions/SetActions'
import { BasePage } from '../components';
import stages from '../assets/getStages';
import characters from '../assets/getCharacters';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

class SetScreen extends Component {
  state = { firstGame: true, selectStage: true, chooseCharacter: false };
  phoneDim = Dimensions.get("window");
  stageArray = [];
  charactersSearch = Object.keys(characters).map(char => { return { name: char } });


  UNSAFE_componentWillMount() {
    this.props.init();
    for(const key in stages) this.stageArray.push({ key, stage: stages[key] });
  }

  shouldComponentUpdate(props) {
    return true;
  }

  pickedRankSlot(rank) {
    console.log(rank);
    if (rank.slotNumber === 1) {
      this.setState({ chooseCharacter: true });
      this.props.chooseRankedSlot(rank)
    }
  }

  renderGameWin() {
    const userChar = characters[this.props.character];
    const opponentChar = characters[this.props.opponentCharacter];
    const { playerNameStyles, playerStyles, characterIconStyle } = styles;

    return (
      <View style={{ flex: 1, alignItems: 'space-between', margin: 5, height: '100%' }}>
        <View style={playerStyles} onTouchEnd={() => this.props.setGameWin(true)}>
          <Image style={characterIconStyle} source={userChar}></Image>
          <Text style={playerNameStyles}>{this.props.userTag}</Text>
        </View>
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: this.phoneDim.width * .8, width: this.phoneDim.width * .8, margin: 5 }} 
            source={stages[this.props.selectedStage]}>
          </Image>
        </View>
        <View style={playerStyles} onTouchEnd={() => this.props.setGameWin(false)}>
          <Text  style={playerNameStyles}>{this.props.opponentTag}</Text>
          <Image style={characterIconStyle} source={opponentChar}></Image>
        </View>
      </View>
    )
  }

  renderStages() {
    const { isWaiting, bannedStages, setStage, banStage, headerText } = this.props
    const widthAndHeight = this.phoneDim.width * .4;
    return this.stageArray.map(stageObj => {
      if (bannedStages.includes(stageObj.key)) return null;
      if (isWaiting) {
        return (
          <View key={stageObj.key}> 
            <Image style={{ height: widthAndHeight, width: widthAndHeight, margin: 5 }} source={stageObj.stage}></Image>
          </View >
        );
      }
      const banOrPick = headerText.indexOf("Choose") !== -1
        ? () => setStage(stageObj.key)
        : () => banStage(stageObj.key);
      return (
        <View key={stageObj.key} onTouchEnd={banOrPick} > 
          <Image style={{ height: widthAndHeight, width: widthAndHeight, margin: 5 }} source={stageObj.stage}></Image>
        </View >
      );
    });
  }

  renderStageStrike() {
    return (
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', flex: 1, width: '100%' }}>
          {this.renderStages()}
        </View>
      </ScrollView>
    );
  }

  renderRanks() {
    return this.props.availableRanks.map(rank => {
      return (
      <TouchableOpacity key={rank.slotNumber} onPress={() => this.pickedRankSlot(rank)}>
        <View style={styles.rankStyles}>
          <Text>{rank.character}</Text>
          <Text>Slot {rank.slotNumber}</Text>
          <Text>{rank.score}</Text>
        </View>
      </TouchableOpacity>
      );
    });
  }
  
  renderSection() {
    if (this.props.headerText.indexOf('Won') !== -1) return (
      <View><Text>{this.props.headerText}</Text></View>
    );
    else if (this.props.character === '' && this.props.opponentCharacter === '' && this.props.games.length === 0) {
      return (
        <View>
          <Text>Choose Rank</Text>
          {this.renderRanks()}

          { this.state.chooseCharacter &&
            <View>
                <SectionedMultiSelect
                  uniqueKey="name" 
                  items={this.charactersSearch} 
                  selectedItems={[this.props.character]} 
                  selectText="Character"
                  showChips={false}
                  single={true}
                  onSelectedItemsChange={chars => this.props.setCharacter(chars[0])}
                  styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5}, selectToggleText: { color: 'white', textAlign: 'center' } }}
                />
            </View>
          }
        </View>
      );
    }
    else if (this.props.selectedStage === '') return this.renderStageStrike();
    else return this.renderGameWin();
  }

  render() {
    return (
      <BasePage headerText={this.props.headerText}>
        {this.renderSection()}
      </BasePage>
    );
  }
}

const styles = {
  playerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4c4f54',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8
  },
  playerNameStyles: {
    fontSize: 24,
    color: 'white'
  },
  characterIconStyle: {
    height: 64,
    width: 64
  },
  rankStyles: {
    flexDirection: 'row', 
    borderWidth: 1, 
    borderRadius: 5, 
    backgroundColor: '#4c4f54',
    width: '80%',
    alignSelf: 'center',
    padding: 10, 
    borderColor: 'black', 
    alignItems: 'space-between'
  }
}

const mapStateToProps = ({ SetReducer, 
  AuthReducer }) => {
  const { opponentTag, opponentCharacter, games, bannedStages, character, selectedStage, headerText, isWaiting, availableRanks } = SetReducer;
  return { 
    opponentTag, 
    opponentCharacter, 
    games, 
    bannedStages, 
    character, 
    selectedStage, 
    headerText,
    userTag: AuthReducer.userTag,
    isWaiting,
    availableRanks
  };
}

export default connect(mapStateToProps, { 
  banStage, 
  resetBannedStages, 
  setGameWin, 
  setOpponent, 
  setStage,
  setBestOf,
  init,
  chooseRankedSlot,
  setCharacter
})(SetScreen);