import { faker } from "@faker-js/faker"


const generateUsers = (ct) => {
    const users = [];

    for (let i = 0; i < ct; i++) {
        const user = {
            address: faker.location.streetAddress(),
            age: faker.datatype.number({ min: 18, max: 65 }),
            backgroundImage: faker.image.avatar(),
            isHost: faker.datatype.boolean(),
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
            location: faker.location.city(),
        };

        users.push(user);
    }
    return users;
}

export default generateUsers;