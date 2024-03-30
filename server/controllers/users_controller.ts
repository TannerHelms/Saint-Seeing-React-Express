import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";

export const buildUsersController = (usersRepository: UsersRepository): Router => {
  const router = Router();

  /**
   * POST / - Create a new user.
   * @name POST/api/users
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @returns {User, string} user token
   */
  router.post("/", async (req, res) => {
    const user = await usersRepository.createUser(req.body);
    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  /**
   * GET /me - Get the current user.
   * @name GET/api/users/me
   * @param {string} token - The JWT token.
   * @returns {User} user A Promise that resolves when the user is found and the response is sent.
   */
  router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
  });

  return router;
}

