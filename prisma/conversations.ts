import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";


async function CreateConversations(db: PrismaClient, userCount: number): Promise<void> {
    for (let i = 1; i <= userCount; i++) {
        for (let j = 1; j <= 5; j++) {
            const profile1Id = i;
            const profile2Id = Math.floor(Math.random() * userCount) + 1;
            try {

                const conversation = await db.conversation.findMany({
                    where: {
                        OR: [
                            { profile1Id, profile2Id },
                            { profile1Id: profile2Id, profile2Id: profile1Id }
                        ]
                    }
                })

                if (conversation.length > 0) {
                    continue;
                }


                const convo = await db.conversation.create({
                    data: {
                        profile1Id,
                        profile2Id,
                        lastMessage: faker.lorem.sentence(),
                        lastMessageAt: faker.date.recent(),
                    },
                });
                for (let k = 1; k <= 5; k++) {

                    await db.message.create({
                        data: {
                            body: faker.lorem.sentence(),
                            senderId: profile1Id,
                            receiverId: profile2Id,
                            profile1Id: convo.profile1Id,
                            profile2Id: convo.profile2Id,
                        },
                    });
                }

            } catch { }
        }
    }
}

export default CreateConversations;