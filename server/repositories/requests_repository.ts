import { PrismaClient } from "@prisma/client";




export class RequestsRepository {
    private db: PrismaClient
    private static instance: RequestsRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): RequestsRepository {
        if (!this.instance) {
            this.instance = new RequestsRepository(db!!);
        }
        return this.instance;
    }

    createRequest = (fromId: number, toId: number) => {
        return this.db.request.create({
            data: {
                fromId,
                toId
            }
        })
    }

    getByUserId = async (userId: number) => {
        const requests = await {
            sent: await this.db.request.findMany({
                where: {
                    fromId: userId
                }
            }),
            received: await this.db.request.findMany({
                where: {
                    toId: userId
                }
            })
        }

        const sent = await Promise.all(requests.sent.map(async (request) => {
            const user = await this.db.user.findUnique({
                where: {
                    id: request.toId
                },
                include: {
                    profile: true
                }
            })

            return {
                ...request,
                user
            }
        }))

        const received = await Promise.all(requests.received.map(async (request) => {
            const user = await this.db.user.findUnique({
                where: {
                    id: request.fromId
                },
                include: {
                    profile: true
                }
            })

            return {
                ...request,
                user
            }
        }))

        return { sent, received }
    }
}
