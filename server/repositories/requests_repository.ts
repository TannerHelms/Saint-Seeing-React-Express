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

    acceptRequest = (fromId: number, toId: number) => {
        return this.db.request.update({
            where: {
                fromId_toId: {
                    fromId,
                    toId
                }
            },
            data: {
                accepted: true
            }

        })
    }

    getByUser = async (fromId: number, toId: number) => {
        const from = await this.db.request.findUnique({
            where: {
                fromId_toId: {
                    fromId,
                    toId
                },
            }
        })
        const to = this.db.request.findUnique({
            where: {
                fromId_toId: {
                    fromId: toId,
                    toId: fromId
                },
            }
        })
        return from || to
    }

    del(from: number, to: number) {
        return this.db.request.delete({
            where: {
                fromId_toId: {
                    fromId: from,
                    toId: to
                }
            }
        })
    }

    getByUserId = async (userId: number) => {
        const requests = await {
            sent: await this.db.request.findMany({
                where: {
                    fromId: userId,
                    accepted: false
                }
            }),
            received: await this.db.request.findMany({
                where: {
                    toId: userId,
                    accepted: false
                }
            }),
            accepted: await this.db.request.findMany({
                where: {
                    OR: [
                        {
                            fromId: userId
                        },
                        {
                            toId: userId
                        }
                    ],
                    accepted: true
                }
            })
        }

        const sent = await Promise.all(requests.sent.map(async (request) => {
            const user = await this.db.user.findUnique({
                where: {
                    profileId: request.toId
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
                    profileId: request.fromId
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

        const accepted = await Promise.all(requests.accepted.map(async (request) => {
            const condition = request.fromId === userId ? request.toId : request.fromId
            const user = await this.db.user.findUnique({
                where: {
                    profileId: condition
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
        return { sent, received, accepted }
    }

}
