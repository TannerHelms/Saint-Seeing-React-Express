import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../middleware/authentication";
import { RequestsRepository } from "../repositories/requests_repository";

// /users/...
export const buildRequestsController = (repository: RequestsRepository) => {
    const router = Router();

    router.post("/", authMiddleware, async (req, res) => {
        try {
            const conversationRequest = await repository.createRequest(req.body.fromId, req.body.toId);
            res.json({ conversationRequest });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Request has already been sent" });
        }
    });

    router.get("/", authMiddleware, async (req, res) => {
        try {
            const { sent, received } = await repository.getByUserId(req.user!!.profileId);
            res.json({ sent, received });
        }
        catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Request not found" });
        }
    });

    return router;
}

