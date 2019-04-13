import faker from 'faker';
import characters from '../assets/getCharacters';

export default generatePlayers = num => {
  const players = [];
  const charNames = Object.keys(characters);

  for (let i = 0; i < num; i++) {
    players.push({
      id: faker.random.uuid(),
      username: faker.name.firstName(),
      email: faker.internet.email(),
      region: faker.address.state(),
      ranks: [
        { 
          eloScore: faker.random.number(5000),
          characters: [{ id: charNames[faker.random.number(25)], percentUsed: 100 }]
        }
      ]
    });
  }
  return players;
};