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
            const conversations = await repository.getByUserId(req.user!!.id);
            res.json({ conversations });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Conversation has already been created" });
        }
    });

    // Get a conversation by its id
    router.get("/:id", authMiddleware, async (req, res) => {
        try {
            const conversation = await repository.getById(req.user!!.id, parseInt(req.params.id));
            res.json({ conversation });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Conversation not found" });
        }
    });

    // Create a conversation between two users 
    router.post("/", authMiddleware, async (req, res) => {
        const { profile1Id, profile2Id } = req.body;
        console.log(profile1Id, profile2Id)
        try {
            const conversation = await repository.create(profile1Id, profile2Id);
            res.json({ conversation });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Conversation has already been created" });
        }
    });

    return router;
}

