import { PrismaClient } from "@prisma/client";




export class MessagesRepository {
    private db: PrismaClient
    private static instance: MessagesRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): MessagesRepository {
        if (!this.instance) {
            this.instance = new MessagesRepository(db!!);
        }
        return this.instance;
    }

    async create(body: string, senderId: number, receiverId: number, profile1Id: number, profile2Id: number) {
        const message = await this.db.message.create({
            data: {
                body,
                senderId,
                receiverId,
                profile1Id,
                profile2Id
            }
        })

        await this.db.conversation.update({
            where: {
                profile1Id_profile2Id: {
                    profile1Id,
                    profile2Id
                }
            },
            data: {
                lastMessage: body,
                lastMessageAt: new Date()
            }
        })

        return message;
    }


    async get(profile1Id: number, profile2Id: number) {
        return await this.db.message.findMany({
            where: {
                profile1Id,
                profile2Id
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
    }
}
