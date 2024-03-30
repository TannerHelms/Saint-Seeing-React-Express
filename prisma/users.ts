import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


export async function CreateUsers(prisma: PrismaClient, numUsers: number) {
    for (let i = 0; i < numUsers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const address = faker.location.streetAddress();
        const age = faker.number.int({ min: 18, max: 65 });
        const profileImage = faker.image.avatar();
        const backgroundImage = faker.image.unsplash.imageUrl();
        const host = faker.datatype.boolean();
        const longitude = faker.location.longitude();
        const latitude = faker.location.latitude();
        const city = faker.location.city();
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

        console.log(`Created user with id: ${user.id}`);
    }
}