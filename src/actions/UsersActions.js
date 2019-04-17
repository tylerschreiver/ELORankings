import { 
  set_users, 
  set_leaderboard, 
  set_viewed_user,
  remove_viewed_user, 
  set_current_user, 
  remove_current_user 
} from './types';
import faker from 'faker';
import generatePlayers from '../mockData/players';

const fakeUsers = [
  {
    id: '2b608d4d-562f-491c-9968-321dda0ec874',
    username: 'Yee',
    email: 'tyler.schreiver+2@interapt.com',
    region: 'Kentucky',
    subregion: 'Lousiville',
    ranks: [
      { eloScore: 6000, userId: '2b608d4d-562f-491c-9968-321dda0ec874', characters: [{ id: 'Marth', percentUsed: 80 }, { id: 'Peach', percentUsed: 20 }], },
      { eloScore: 3200, userId: '2b608d4d-562f-491c-9968-321dda0ec874', characters: [{ id: 'Mario', percentUsed: 100 }]}
    ]
  },
  {
    id: '2b608d4d-562f-491c-9968-321dda0ec875',
    username: 'Nato',
    email: 'nato@google.com',
    region: 'Kentucky',
    subregion: 'The Vill',
    ranks: [{
      eloScore: 2000, 
      characters: [{ id: 'Falco', id: '2b608d4d-562f-491c-9968-321dda0ec875', percentUsed: 100 }]
    }]
  }
];

export const getUsers = () => {
  const fake = generatePlayers(20);
  const payload = fakeUsers.concat(fake);
  return { type: set_users, payload };
};

export const getLeaderboard = () => {
  return (dispatch, getState) => {
    // await dispatch(getUsers());
    const users = getState().UsersReducer.users;
    let ranks = []
    users.forEach(user => {
      user.ranks.forEach(rank => {
        const id = faker.random.uuid();
        ranks.push({ 
          username: user.username,
          userId: user.id,
          eloScore: rank.eloScore, 
          region: user.region,
          characters: rank.characters, 
          id
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
    }
    const ranks = getState().UsersReducer.leaderboard.filter(rank => rank.userId === id);
    return ranks;
  }
}

export const getUserById = id => {
  return (dispatch, getState) => {
    const { users } = getState().UsersReducer;
    return users.find(user => user.id === id);
  }
}