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
    console.log(response);
    const json = await response.json();
    console.log(json);
  }
  // return { type: set_users, payload };
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
          eloScore: rank.eloScore, 
          region: user.region,
          characters: rank.characters.map(char => char.id), 
          id
        });
      });
    });
    ranks.sort((a, b) => b.eloScore - a.eloScore);
    dispatch({ type: 'set_leaderboard', payload: ranks });
  }
}