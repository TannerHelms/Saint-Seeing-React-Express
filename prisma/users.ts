import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const locations = [
    { city: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { city: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
    { city: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
    { city: 'Houston', latitude: 29.7604, longitude: -95.3698 },
    { city: 'Phoenix', latitude: 33.4484, longitude: -112.0740 },
    { city: 'Philadelphia', latitude: 39.9526, longitude: -75.1652 },
    { city: 'San Antonio', latitude: 29.4241, longitude: -98.4936 },
]


export async function CreateUsers(prisma: PrismaClient, numUsers: number) {
    for (let i = 0; i < numUsers; i++) {
        const location = faker.helpers.arrayElement(locations);
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const address = faker.location.streetAddress();
        const age = faker.number.int({ min: 18, max: 65 });
        const profileImage = faker.image.avatar();
        const backgroundImage = faker.image.url();
        const host = faker.datatype.boolean();
        const longitude = location.longitude;
        const latitude = location.latitude;
        const city = location.city;
        const bio = faker.lorem.paragraph();
        const rules = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password_hash: password,
                profile: {
                    create: {
                        address,
                        age,
                        profileImage,
                        backgroundImage,
                        host,
                        longitude,
                        latitude,
                        city,
                        bio,
                        rules,
                    },
                },
            },
        });
    }
}