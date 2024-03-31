import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";

export const buildUsersController = (usersRepository: UsersRepository): Router => {
  const router = Router();

  // Get all users
  router.get("/", authMiddleware, async (req, res) => {
    const users = await usersRepository.getUsers();
    res.json({ users });
  });

  // Create a user
  router.post("/", authMiddleware, async (req, res) => {
    const user = await usersRepository.createUser(req.body);
    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  // Get current user
  router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
  });


  // Get a single user
  router.get("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const user = await usersRepository.getUserById(parseInt(id));
    res.json({ user });
  });


  return router;
}

