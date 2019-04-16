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
    userId: faker.random.uuid(),
    username: 'Yee',
    email: 'tyler.schreiver+2@interapt.com',
    region: 'Kentucky',
    subregion: 'Lousiville',
    ranks: [
      { eloScore: 6000, characters: [{ id: 'Marth', percentUsed: 80 }, { id: 'Peach', percentUsed: 20 }], },
      { eloScore: 3200, characters: [{ id: 'Mario', percentUsed: 100 }]}
    ]
  },
  {
    userId: faker.random.uuid(),
    username: 'Nato',
    email: 'nato@google.com',
    region: 'Kentucky',
    subregion: 'The Vill',
    ranks: [{
      eloScore: 2000, 
      characters: [{ id: 'Falco', percentUsed: 100 }]
    }]
  }
];

export const getUsers = () => {
  const fake = generatePlayers(20);
  const payload = fakeUsers.concat(fake);
  return { type: set_users, payload };
};

export const getLeaderboard = () => {
  return async (dispatch, getState) => {
    // await dispatch(getUsers());
    const users = getState().UsersReducer.users;
    const ranks = []
    users.forEach(user => {
      user.ranks.forEach(rank => {
        const id = faker.random.uuid();
        ranks.push({ 
          username: user.username,
          userId: user.id,
          eloScore: rank.eloScore, 
          region: user.region,
          characters: rank.characters.map(char => char.id), 
          id
        });
      });
    });
    ranks.sort((a, b) => b.eloScore - a.eloScore);
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

export const getPlayerRanks = user => {
  const { userId } = user;
  return (dispatch, getState) => {
    const { leaderboard } = getState().UsersReducer;
    const ranks = leaderboard.filter(rank => {
      return rank.userId === userId;
    });
    return ranks;
  }
}