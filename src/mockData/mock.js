import faker from 'faker';

export const generateEvents = () => {
    let events = [];

    for (let i = 0; i < 100; i++) {
        let id = faker.random.uuid();
        let region = {id: faker.random.uuid(), region: faker.address.state()}
        let name = "Event " + i;
        let timeslots = [{start: faker.date.recent(), end: faker.date.future()}];

        events.push({
            "id": id,
            "region": region,
            "name": name,
            "activeTimeslots": timeslots
        });
    }

    return {"events": events }
}

// module.exports = generateEvents