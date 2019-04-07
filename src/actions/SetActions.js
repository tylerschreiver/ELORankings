import { set_banned_stage, set_game_win, set_opponent, reset_banned_stages, set_best_of, set_user_character, set_stage } from './types';

export const banStage = (stage) => {
  return { type: set_banned_stage, payload: stage };
};

export const resetBannedStages = () => {
  return { type: reset_banned_stages };
};

export const setGameWin = (player) => {
  return { type: set_game_win, payload: player };
};

export const setOpponent = (opponent) => {
  return { type: set_opponent, payload: opponent };
};

export const setBestOf = (bestOf) => {
  return { type: set_best_of, payload: bestOf };
};

export const setCharacter = (character) => {
  return { type: set_user_character, payload: character };
};

export const setStage = (stage) => {
  return { type: set_stage, payload: stage };
};