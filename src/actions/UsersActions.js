import { set_users, set_leaderboard } from './types';
import faker from 'faker';
import backendUrl from '../globals/environment';
import generatePlayers from '../mockData/players';

// const fakeUsers = [
//   {
//     id: faker.random.uuid(),
//     username: 'Yee',
//     email: 'tyler.schreiver+2@interapt.com',
//     region: 'Kentucky',
//     ranks: [
//       { eloScore: 6000, characters: [{ id: 'Marth', percentUsed: 80 }, { id: 'Peach', percentUsed: 20 }], },
//       { eloScore: 3200, characters: [{ id: 'Mario', percentUsed: 100 }]}
//     ]
//   },
//   {
//     id: faker.random.uuid(),
//     username: 'Nato',
//     email: 'nato@google.com',
//     region: 'Kentucky',
//     ranks: [{
//       eloScore: 2000, 
//       characters: [{ id: 'Falco', percentUsed: 100 }]
//     }]
//   }
// ];

export const getUsers = () => {
  // const fake = generatePlayers(20);
  // const payload = fakeUsers.concat(fake);
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
    // await dispatch(getUsers());
    const users = getState().UsersReducer.users;
    const ranks = []
    users.forEach(user => {
      // if (user.ranks) {
        console.log(user);
        user.ranks.forEach(rank => {
          ranks.push({ 
            username: user.displayName,
            eloScore: rank.score, 
            region: user.regionId,
            characters: [rank.character],
            id: rank.id
          });
        });
      // }
    });
    ranks.sort((a, b) => b.eloScore - a.eloScore);
    dispatch({ type: 'set_leaderboard', payload: ranks });
  }
}