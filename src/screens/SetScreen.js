import React, { Component } from 'react';
import { Image, View, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { 
  banStage, 
  resetBannedStages, 
  setGameWin, 
  setOpponent, 
  setBestOf, 
  setStage, 
  init, 
  chooseRankedSlot, 
  setCharacter,
  updateScore
} from '../actions/SetActions'
import { BasePage } from '../components';
import stages from '../assets/getStages';
import characters from '../assets/getCharacters';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

rankNames = ["Primary", "Secondary", "Third", "Fourth", "Fifth"];

class SetScreen extends Component {
  state = { firstGame: true, selectStage: true, chooseCharacter: false, headerText: '', newScore: null };
  phoneDim = Dimensions.get("window");
  stageArray = [];
  charactersSearch = Object.keys(characters).map(char => { return { name: char } });
  hasUpdatedScore = false;

  UNSAFE_componentWillMount() {
    // this.setState({ firstGame: true, selectStage: true, chooseCharacter: false, headerText: '', newScore: null })
    this.props.init();
    for(const key in stages) this.stageArray.push({ key, stage: stages[key] });
  }

  shouldComponentUpdate(props) {
    return true;
  }

  componentDidUpdate() {
    // const shouldChoose = this.props.games.length ? this.props.games[this.props.games.length - 1].didWin : false;
    if (this.props.selectedStage && this.props.games.length) {
      if ((this.props.opponentCharacter === null && this.props.character === null) && this.state.chooseCharacter !== this.props.games[this.props.games.length - 1].didWin) {
        this.setState({ chooseCharacter: this.props.games[this.props.games.length - 1].didWin });
      } else if (this.props.opponentCharacter !== null && this.props.character === null && !this.state.chooseCharacter) {
        this.setState({ chooseCharacter: true });
      } else if (this.props.opponentCharacter === null && this.props.character !== null && this.state.chooseCharacter) {
        this.setState({ chooseCharacter: false });
      }

    }
  }

  pickedRankSlot(rank) {
    if (rank.slotNumber === 1) {
      this.setState({ chooseCharacter: true });
      this.props.chooseRankedSlot(rank)
    }
  }

  async updateScore(opponentRank, rank, didWin) {
    const score = await this.props.updateScore(opponentRank, rank, didWin);
    this.setState({ newScore: score });
  }

  renderGameWin() {
    const userChar = characters[this.props.character];
    const opponentChar = characters[this.props.opponentCharacter];
    const { playerNameStyles, playerStyles, characterIconStyle } = styles;

    if (this.state.headerText) this.setState({ headerText: '' });

    return (
      <View style={{ flex: 1, alignItems: 'space-between', margin: 5, height: '100%' }}>
        <View style={playerStyles} onTouchEnd={() => this.props.setGameWin(this.props.tag)}>
          <Image style={characterIconStyle} source={userChar}></Image>
          <Text style={playerNameStyles}>{this.props.tag}</Text>
        </View>
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: this.phoneDim.width * .8, width: this.phoneDim.width * .8, margin: 5 }} 
            source={stages[this.props.selectedStage]}>
          </Image>
        </View>
        <View style={playerStyles} onTouchEnd={() => this.props.setGameWin(this.props.opponentTag)}>
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
        ? () => { this.setState({ chooseCharacter: false }); setStage(stageObj.key) }
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
    const { basicTextStyle, characterIconStyle } = styles;

    if (!this.props.availableRanks) return null;
    return this.props.availableRanks.map(rank => {
      return (
      <TouchableOpacity key={rank.slotNumber} onPress={() => this.pickedRankSlot(rank)}>
        <View style={styles.rankStyles}>
          <Text style={basicTextStyle}>{rankNames[rank.slotNumber - 1]} Slot</Text>
          <Image style={characterIconStyle} source={characters[rank.character]}></Image>
          <Text style={[basicTextStyle, { alignSelf: 'flex-end' }]}>Score {Math.floor(rank.score)}</Text>
        </View>
      </TouchableOpacity>
      );
    });
  }
  
  renderSection() {
    const { 
      setOver, 
      opponentRank, 
      rank, 
      games, 
      setCharacter, 
      opponentCharacter, 
      character, 
      selectedStage, 
      headerText 
    } = this.props;

    const { inputStyle, basicTextStyle } = styles;

    if (setOver) {
      if (this.state.headerText) this.setState({ headerText: '' });
      if (!this.hasUpdatedScore) {
        this.hasUpdatedScore = true;
        this.updateScore(opponentRank, rank, games[games.length - 1].didWin)
      }
      return (
        <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
          <Text style={basicTextStyle}>{headerText}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={basicTextStyle}>{Math.floor(rank.score)}</Text>
            <Icon
              color="white" 
              name={'angle-right'}
              type="font-awesome"
            />
            <Text style={basicTextStyle}>{Math.floor(this.state.newScore)}</Text>
          </View>
        </View>
      );
    } 
    else if ((character === null || opponentCharacter === null) && games.length === 0) {
      if (this.state.headerText !== 'Choose your ranked slot') this.setState({ headerText: 'Choose your ranked slot' })
      return (
        <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 15 }}>Choose Rank</Text>
          {this.renderRanks()}

          { this.state.chooseCharacter &&
            <View>
                <SectionedMultiSelect
                  uniqueKey="name" 
                  items={this.charactersSearch} 
                  selectedItems={[character]} 
                  selectText="Character"
                  showChips={false}
                  single={true}
                  onSelectedItemsChange={chars => setCharacter(chars[0])}
                  styles={{ selectToggle: [{ height: 50, width: '100%' }, inputStyle], selectToggleText: { color: 'white', textAlign: 'center' } }}

                  // styles={{ selectToggle: {height: 50, width: 120, backgroundColor: 'rebeccapurple', borderRadius: 5}, selectToggleText: { color: 'white', textAlign: 'center' } }}
                />
            </View>
          }
        </View>
      );
    }
    else if (selectedStage === '') {
      if (this.state.headerText) this.setState({ headerText: '' });
      return this.renderStageStrike();
    }
    else if ((character === null || opponentCharacter === null) && games.length !== 0) {
      if (this.state.chooseCharacter) {
        if (this.state.headerText !== 'Choose your character!') this.setState({ headerText: 'Choose your character!'})
        return (
          <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
            <View>
              <Text style={basicTextStyle}>Choose character for next game</Text>
              <SectionedMultiSelect
                uniqueKey="name" 
                items={this.charactersSearch} 
                selectedItems={[character]} 
                selectText="Character"
                showChips={false}
                single={true}
                onSelectedItemsChange={chars => setCharacter(chars[0])}
                styles={{ selectToggle: [{ height: 50, width: '100%' }, inputStyle], selectToggleText: { color: 'white', textAlign: 'center' } }}
              />
            </View>
          </View>
        );
      }
      if (this.state.headerText !== 'Wait for Opponent') this.setState({ headerText: 'Wait for Opponent'})
      return (
        <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
          <View>
            <Text style={basicTextStyle}>Waiting for opponent to choose character</Text>
          </View>
        </View>
      );
    }
    else return this.renderGameWin();
  }

  render() {
    const headerText = this.state.headerText ? this.state.headerText : this.props.headerText;
    return (
      <BasePage headerText={headerText}>
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
    width: '100%',
    padding: 10, 
    borderColor: 'black', 
    justifyContent: 'space-between',
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
  basicTextStyle: {
    color: 'white',
    fontSize: 16
  }
}

const mapStateToProps = ({ SetReducer }) => {
  const { 
    opponentTag, 
    opponentCharacter,
    opponentRank,
    rank,
    games, 
    bannedStages, 
    character, 
    selectedStage, 
    headerText,
    setOver,
    isWaiting, 
    availableRanks, 
    tag 
  } = SetReducer;
  return { 
    opponentTag, 
    opponentCharacter, 
    opponentRank,
    rank,
    games, 
    bannedStages, 
    setOver,
    character, 
    selectedStage, 
    headerText,
    tag,
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
  setCharacter,
  updateScore
})(SetScreen);