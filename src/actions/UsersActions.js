import { 
  set_users, 
  set_leaderboard, 
  set_viewed_user,
  remove_viewed_user, 
  get_admins,
  remove_current_user 
} from './types';
import backendUrl from '../globals/environment';


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

export const removeCurrentUser = () => {
  return { type: remove_current_user };
};

export const getPlayerRanks = id => {
  return async (dispatch, getState) => {
    if (getState().UsersReducer.leaderboard.length === 0) {
      dispatch(getLeaderboard());
    }
    const ranks = getState().UsersReducer.leaderboard.filter(rank => {
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

export const getAdmins = () => {
  return async (dispatch, getState) => {
    try {
      const { headers } = getState().AuthReducer;
      const response = await fetch(`${backendUrl}/Users?role=Player`, {
        method: "GET",
        headers
      });
      const admins = await response.json();
      dispatch({ type: get_admins, payload: admins });
    } catch (e) {
      console.log(e);
    }
  }
};