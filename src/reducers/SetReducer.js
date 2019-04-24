import { 
  set_best_of, 
  set_banned_stage, 
  set_game_win, 
  set_opponent, 
  reset_banned_stages, 
  set_user_character, 
  set_stage,
  set_set_id,
  set_available_ranks,
  set_rank,
  set_character,
  set_pending_game_win
} from '../actions/types';

const stages = ['Dreamland', 'Fountain of Dreams', 'Battlefield', 'Final Destination', 'Yoshis Story', 'Pokemon Stadium'];

const INITIAL_STATE = {
  opponentTag: '',
  opponentCharacter: '',
  games: [],
  tag: '',
  bannedStages: ['Pokemon Stadium'],
  selectedStage: '',
  bestOf: 5,
  character: '',
  headerText: 'Strike 1 Stage',
  strikeFirst: false,
  setOver: false,
  setId: null,
  isWaiting: false,
  availableRanks: [],
  rank: null,
  opponentRank: null,
  pendingWinner: null
};

const SetReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case reset_banned_stages:
      return { ...state, bannedStages: [] };

    case set_banned_stage: {
      if (!state.bannedStages.includes(action.payload)) {
        const bannedStages = [ ...state.bannedStages, action.payload ];
        if (state.games.length === 0 && bannedStages.length === 5) {
          const selectedStage = stages.filter(stage => bannedStages.indexOf(stage) === -1);
          return { ...state, bannedStages, selectedStage: selectedStage[0], headerText: "Select the Winner" };
        }
        const newState = { ...state, bannedStages }
        newState.headerText = getHeaderText(newState);
        newState.isWaiting = newState.headerText.includes('Wait');
        return { ...newState };
      } else return state;
    }
  
    case set_opponent:
      return { ...state, opponent: action.payload };

    case set_pending_game_win: {
      return { ...state, pendingWinner: action.payload };
    }

    case set_game_win: { 
      if (state.pendingWinner === null) return { ...state };
      console.log('winner confirmed');
      const game = { 
        winner: state.pendingWinner.winner, 
        userCharacter: state.character, 
        opponentTag: state.opponentTag, 
        opponentCharacter: state.opponentCharacter,
        stage: state.selectedStage
      };
      const games = [ ...state.games, game]
      const newState = { ...state, games, selectedStage: '', bannedStages: [] };
      newState.setOver = isSetOver(newState);
      newState.headerText = getHeaderText(newState);
      newState.isWaiting = newState.headerText.includes('Wait');
      newState.pendingWinner = null;
      newState.bannedStages = game.didWin ? getBannedOpponentStages(games) : getBannedUserStages(games);
      return { ...newState };
    }
    case set_best_of: 
      return { ...state, bestOf: action.payload };

    case set_user_character: 
      return { ...state, character: action.payload };

    case set_stage: {
      const newState = { ...state, selectedStage: action.payload }
      newState.headerText =  getHeaderText(newState);
      newState.isWaiting = newState.headerText.includes('Wait');
      return { ...newState };
    }
    case set_set_id: {
      const newState = state;
      newState.setId = action.payload.setId;
      newState.strikeFirst = action.payload.strikeFirst;
      newState.headerText = getHeaderText(newState); 
      newState.isWaiting = newState.headerText.includes('Wait');
      return { ...newState }
    }

    case set_available_ranks: {
      console.log(action.payload);
      return { 
        ...state, 
        availableRanks: action.payload.rank, 
        opponentTag: action.payload.opponentTag, 
        tag: action.payload.tag 
      };
    } 

    case set_rank: {
      if (action.payload.rank) {
        return { ...state, rank: action.payload.rank };
      } else if (action.payload.opponentRank) {
        return { ...state, opponentRank: action.payload.opponentRank };
      } else return { ...state };
    }

    case set_character: {
      if (action.payload.character) {
        return { ...state, character: action.payload.character };
      } else if (action.payload.opponentCharacter) {
        return { ...state, opponentCharacter: action.payload.opponentCharacter };
      } else return { ...state };
    }
    default: return state;
   }
}

const getBannedUserStages = (games) => {
  const bannedStages = []
  games.forEach(game => {
    if (game.didWin) bannedStages.push(game.stage)
  })
  return bannedStages;
}

const getBannedOpponentStages = (games) => {
  const bannedStages = []
  games.forEach(game => {
    if (!game.didWin) bannedStages.push(game.stage)
  })
  return bannedStages;
}

const getHeaderText = (state) => {
  if (state.setOver) return state.games[state.games.length - 1].didWin ? 'You Won!' : state.opponentTag + ' won';
  if (state.selectedStage !== '') return 'Select the Winner';
  
  const bannedLength = state.bannedStages.length;

  if (state.games.length === 0) {
    // pokemon stadium
    if (bannedLength === 1 || bannedLength === 4) return state.strikeFirst ? 'Strike 1 Stage' : 'Wait for Opponent to Strike';
    if (bannedLength === 2) return state.strikeFirst ? 'Wait for Opponent to Strike' : 'Strike 2 Stages';
    if (bannedLength === 3) return state.strikeFirst ? 'Wait for Opponent to Strike' : 'Strike 1 Stage';
  }
  else if (state.bestOf === 3) {
    if (state.games.length === 1) {
      if (state.games[0].didWin) return bannedLength === 0 ? 'Strike 1 Stage' : 'Wait for Opponent To Choose Stage';
      else return bannedLength === 0 ? 'Wait for Opponent to Strike' : 'Choose Stage';
    } else if (state.games.length === 2) {
      if (state.games[1].didWin) return bannedLength <= 1 ? 'Strike 1 Stage' : 'Wait for Opponent To Choose Stage';
      else return bannedLength <= 1 ? 'Wait for Opponent to Strike' : 'Choose Stage';
    }
  } else if (state.bestOf === 5) {
    return state.games[state.games.length - 1].didWin ? 'Wait for Opponent to Choose Stage' : 'Choose Stage';
  }
}

const isSetOver = (state) => {
  if (state.games.length === state.bestOf) return true;
  if (state.bestOf === 3) {
    if (state.games.length <= 1) return false;
    else if (state.games.length === 2) {
      return state.games[0].didWin && state.games[1].didWin || (!state.games[0].didWin && !state.games[1].didWin);
    }
  } else if (state.bestOf === 5) {
    if (state.games.length <= 2) return false;
    else {
      userWon = opponentWon = 0;
      state.games.forEach(game => {
        if (game.didWin) userWon++;
        else opponentWon++;
      });
      return userWon === 3 || opponentWon === 3;
    }
  }
}

export default SetReducer;