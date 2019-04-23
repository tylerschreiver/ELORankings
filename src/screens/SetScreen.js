import React, { Component } from 'react';
import { Image, View, ScrollView, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';

import { banStage, resetBannedStages, setGameWin, setOpponent, setBestOf, setStage, init } from '../actions/SetActions'
import { BasePage } from '../components';
import stages from '../assets/getStages';
import characters from '../assets/getCharacters';

class SetScreen extends Component {
  state = { firstGame: true, selectStage: true };
  phoneDim = Dimensions.get("window");
  stageArray = [];

  UNSAFE_componentWillMount() {
    console.log('mount')
    this.props.init();
    for(const key in stages) this.stageArray.push({ key, stage: stages[key] });
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
    const widthAndHeight = this.phoneDim.width * .4;
    return this.stageArray.map(stageObj => {
      if (this.props.bannedStages.includes(stageObj.key)) return null;
      if (this.props.isWaiting) {
        return (
          <View key={stageObj.key}> 
            <Image style={{ height: widthAndHeight, width: widthAndHeight, margin: 5 }} source={stageObj.stage}></Image>
          </View >
        );
      }
      const banOrPick = this.props.headerText.indexOf("Choose") !== -1
        ? () => this.props.setStage(stageObj.key)
        : () => this.props.banStage(stageObj.key);
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
  
  renderSection() {
    if (this.props.headerText.indexOf('Won') !== -1) return (
      <View><Text>{this.props.headerText}</Text></View>
    );
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
  }
}

const mapStateToProps = ({ SetReducer, AuthReducer }) => {
  const { opponentTag, opponentCharacter, games, bannedStages, character, selectedStage, headerText, isWaiting } = SetReducer;
  return { 
    opponentTag, 
    opponentCharacter, 
    games, bannedStages, 
    character, 
    selectedStage, 
    headerText,
    userTag: AuthReducer.userTag,
    isWaiting
  };
}

export default connect(mapStateToProps, { 
  banStage, 
  resetBannedStages, 
  setGameWin, 
  setOpponent, 
  setStage,
  setBestOf,
  init
})(SetScreen);