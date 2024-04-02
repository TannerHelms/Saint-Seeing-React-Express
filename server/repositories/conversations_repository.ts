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

    create = async (profile1Id: number, profile2Id: number) => {
        return await this.db.conversation.create({
            data: {
                profile1Id,
                profile2Id,
                lastMessage: "Chat Created",
                lastMessageAt: new Date()
            }
        })
    }

    getByUserId = async (userId: number) => {
        const conversations = await this.db.conversation.findMany({
            where: {
                OR: [
                    { profile1Id: userId },
                    { profile2Id: userId }
                ]
            },
            orderBy: {
                lastMessageAt: 'desc'
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
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

    getById = async (profile1Id: number, profile2Id: number) => {
        const conversation = await this.db.conversation.findMany({
            where: {
                OR: [
                    { profile1Id, profile2Id },
                    { profile1Id: profile2Id, profile2Id: profile1Id }
                ]
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })

        if (conversation.length == 0) {
            throw new Error("Conversation not found")
        }

        return conversation[0];
    }
}