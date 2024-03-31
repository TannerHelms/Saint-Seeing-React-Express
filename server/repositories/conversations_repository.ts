import { PrismaClient } from "@prisma/client";



export class ConversationsRepository {
    private db: PrismaClient
    private static instance: ConversationsRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): ConversationsRepository {
        if (!this.instance) {
            this.instance = new ConversationsRepository(db!!);
        }
        return this.instance;
    }

    getByUserId = async (userId: number) => {
        const conversations = await this.db.conversation.findMany({
            where: {
                OR: [
                    { profile1Id: userId },
                    { profile2Id: userId }
                ]
            }
        })

        return Promise.all(conversations.map(async (conversation) => {
            let user = null;
            if (conversation.profile1Id === userId) {
                user = await this.db.user.findUnique({
                    where: {
                        id: conversation.profile2Id
                    },
                    include: {
                        profile: true
                    }
                })
            } else {
                user = await this.db.user.findUnique({
                    where: {
                        id: conversation.profile1Id
                    },
                    include: {
                        profile: true
                    }
                })
            }
            return {
                ...conversation,
                user
            }
        }))
    }
}