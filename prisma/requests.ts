import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";


async function CreateRandomRequests(db: PrismaClient, ct: number) {
    for (let i = 0; i < ct; i++) {
        const userId = i + 1;

        for (let j = 0; j < 7; j++) {
            const requestId = faker.number.int({ min: 1, max: ct });
            try {
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