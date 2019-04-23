import { 
  set_banned_stage, 
  set_game_win, 
  set_opponent, 
  reset_banned_stages, 
  set_best_of, 
  set_user_character, 
  set_stage, 
  set_rank, 
  set_character 
} from './types';
import socket from '../globals/socket';

export const init = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().AuthReducer;
    socket.on('stageBanned', stage => {
      dispatch({ type: set_banned_stage, payload: stage });
    });
    socket.on('rankChosen', rank => {
      console.log('rankChose');
      console.log(rank);
      const payload = rank.id === uid ? { rank: rank.rank } : { opponentRank: rank.rank }
      dispatch({ type: set_rank, payload });
    });
    socket.on('characterChosen', char => {
      console.log('charChose');
      console.log(char);
      const payload = char.id === uid ? { character: char.character } : { opponentCharacter: char.character }
      dispatch({ type: set_character, payload })
    })
  }
}

export const banStage = stage => {
  return async (dispatch, getState) => {
    const { setId } = getState().SetReducer;
    socket.emit('removeStage', { stage, setId });
  }
};

export const chooseRankedSlot = slot => {
  console.log('choose');
  console.log(slot);
  return async (dispatch, getState) => {
    const { setId } = getState().SetReducer;
    console.log({ rank: slot, setId });
    socket.emit('chooseRank', { rank: slot, setId })
  }
}

export const setCharacter = char => {
  return async (dispatch, getState) => {
    console.log(char);
    const { setId } = getState().SetReducer;
    socket.emit('chooseCharacter', { setId, character: char });
  }
}

export const resetBannedStages = () => {
  return { type: reset_banned_stages };
};

export const setGameWin = player => {
  return { type: set_game_win, payload: player };
};

export const setOpponent = opponent => {
  return { type: set_opponent, payload: opponent };
};

export const setBestOf = bestOf => {
  return { type: set_best_of, payload: bestOf };
};

// export const setCharacter = character => {
//   return { type: set_user_character, payload: character };
// };

export const setStage = stage => {
  return { type: set_stage, payload: stage };
};