import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";


async function CreateRandomRequests(db: PrismaClient, ct: number) {
    for (let i = 0; i < ct; i++) {
        const userId = i + 1;

        for (let j = 0; j < 7; j++) {
            const requestId = faker.number.int({ min: 1, max: ct });
            try {

                const check = await db.conversation.findMany({
                    where: {
                        OR: [
                            {
                                profile1Id: userId,
                                profile2Id: requestId
                            },
                            {
                                profile1Id: requestId,
                                profile2Id: userId
                            }
                        ]
                    }
                })

                if (check.length > 0) continue;
                await db.request.create({
                    data: {
                        fromId: userId,
                        toId: requestId,
                        createdAt: faker.date.recent(),
                    }
                });
            } catch { }
        }
    }
}

export default CreateRandomRequests;