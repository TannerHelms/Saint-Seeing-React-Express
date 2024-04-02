import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../middleware/authentication";
import { MessagesRepository } from "../repositories/messages_repository";

// /users/...
export const buildMessagesController = (repository: MessagesRepository) => {
    const router = Router();

    // Create a message between two users
    router.post("/", authMiddleware, async (req, res) => {
        const { body, receiverId, profile1Id, profile2Id } = req.body;
        try {
            const message = await repository.create(body, req.user!!.id, receiverId, profile1Id, profile2Id);
            res.json({ message });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Message has already been sent" });
        }
    });

    // Get all the messages between two users
    router.get("/:profile1Id/:profile2Id", authMiddleware, async (req, res) => {
        try {
            const messages = await repository.get(parseInt(req.params.profile1Id), parseInt(req.params.profile2Id));
            res.json({ messages });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Messages not found" });
        }
    });

    return router;
}

