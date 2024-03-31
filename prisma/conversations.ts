import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";


async function CreateConversations(db: PrismaClient, userCount: number): Promise<void> {
    for (let i = 1; i <= userCount; i++) {
        for (let j = 1; j <= 5; j++) {
            const profile1Id = i;
            const profile2Id = Math.floor(Math.random() * userCount) + 1;
            try {

                await db.conversation.create({
                    data: {
                        profile1Id,
                        profile2Id,
                        lastMessage: faker.lorem.sentence(),
                        lastMessageAt: faker.date.recent(),
                    },
                });
            } catch { }
        }
    }
}

export default CreateConversations;