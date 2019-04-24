import { 
  set_users, 
  set_leaderboard, 
  set_viewed_user,
  remove_viewed_user, 
  set_current_user, 
  remove_current_user 
} from './types';
import faker from 'faker';
import backendUrl from '../globals/environment';
import generatePlayers from '../mockData/players';


export const getUsers = () => {
  return async (dispatch, getState) => {
    const { headers } = getState().AuthReducer;
    const response = await fetch(`${backendUrl}/Users`, {
      method: "GET",
      headers
    });
    const json = await response.json();
    dispatch({ type: set_users, payload: json });
  }
};

export const getLeaderboard = () => {
  return async (dispatch, getState) => {
    const users = getState().UsersReducer.users;
    if (!users.length) await getUsers();
    let ranks = []
    users.forEach(user => {
      user.ranks.forEach(rank => {
        ranks.push({ 
          username: user.displayName,
          eloScore: rank.score, 
          region: user.regionId,
          character: rank.character,
          id: rank.id,
          userId: user.id
        });
      });
    });
    ranks.sort((a, b) => b.eloScore - a.eloScore);
    ranks.forEach((rank, i) => rank.position = i);
    dispatch({ type: set_leaderboard, payload: ranks });
  }
};

export const setViewedUser = user => {
  return { type: set_viewed_user, payload: user };
};

export const removeViewedUser = () => {
  return { type: remove_viewed_user };
};

export const setCurrentUser = user => {
  // TODO DO THIS RIGHt
  return { type: set_current_user, payload: fakeUsers[0] };
};

export const removeCurrentUser = () => {
  return { type: remove_current_user };
};

export const getPlayerRanks = id => {
  return async (dispatch, getState) => {
    if (getState().UsersReducer.leaderboard.length === 0) {
      dispatch(getLeaderboard());
      console.log(id);
    }
    const ranks = getState().UsersReducer.leaderboard.filter(rank => {
      console.log(rank);
      return rank.userId === id
    });
    return ranks;
  }
}

export const getUserById = id => {
  return (dispatch, getState) => {
    const { users } = getState().UsersReducer;
    return users.find(user => user.id === id);
  }
}