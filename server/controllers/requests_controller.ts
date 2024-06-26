import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../middleware/authentication";
import { RequestsRepository } from "../repositories/requests_repository";

// /users/...
export const buildRequestsController = (repository: RequestsRepository) => {
    const router = Router();


    // Create a request between two users
    router.post("/", authMiddleware, async (req, res) => {
        try {
            const conversationRequest = await repository.createRequest(req.body.fromId, req.body.toId);
            res.json({ conversationRequest });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Request has already been sent" });
        }
    });

    // Get a request between 2 users
    router.get("/:id", authMiddleware, async (req, res) => {
        try {
            const request = await repository.getByUser(req.user!!.profileId, parseInt(req.params.id));
            res.json({ request });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Request not found" });
        }
    });


    // Get all the requests that a user has sent and received
    router.get("/", authMiddleware, async (req, res) => {
        try {
            let { sent, received, accepted } = await repository.getByUserId(req.user!!.profileId);
            sent = sent.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            received = received.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            accepted = accepted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            res.json({ sent, received, accepted });
        }
        catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Request not found" });
        }
    });

    // Cancel a request
    router.delete("/:id", authMiddleware, async (req, res) => {
        try {
            const id = req.params.id;
            await repository.del(req.user!!.id, parseInt(id));
            res.json({ message: "Request has been cancelled" });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Request not found" });
        }
    });

    // accept a request
    router.put("/accept/:id", authMiddleware, async (req, res) => {
        try {
            const id = req.params.id;
            await repository.acceptRequest(parseInt(id), req.user!!.profileId);
            res.status(StatusCodes.OK).json({ success: true })
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Request not found" });
        }
    });

    router.get("/count/:id", authMiddleware, async (req, res) => {
        try {
            const { accepted } = await repository.getByUserId(parseInt(req.params.id));
            res.json({ count: accepted.length });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "User not found" });
        }
    });

    return router;
}

