import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../middleware/authentication";
import { ConversationsRepository } from "../repositories/conversations_repository";

// /users/...
export const buildConversationsController = (repository: ConversationsRepository) => {
    const router = Router();

    // Get all the conversation that a user is in
    router.get("/", authMiddleware, async (req, res) => {
        try {
            const conversation = await repository.getByUserId(req.user!!.id);
            res.json({ conversation });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Conversation has already been created" });
        }
    });

    return router;
}

