import { Router } from "express";
import { StatusCodes } from "http-status-codes";
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
  router.post("/", async (req, res) => {
    try {
      const background = Array.isArray(req.files?.background) ? req.files.background[0] : req.files?.background;
      const profile = Array.isArray(req.files?.profile) ? req.files.profile[0] : req.files?.profile;
      const backgroundPath = `/assets/background/${Date.now()}-${background?.name}`;
      const profilePath = `/assets/avatar/${Date.now()}-${profile?.name}`;
      if (background) background.mv("." + backgroundPath);
      if (profile) profile.mv("." + profilePath);
      const user = await usersRepository.createUser({
        ...req.body,
        backgroundImage: process.env.SERVER_URL + backgroundPath,
        profileImage: process.env.SERVER_URL + profilePath,
        rules: [],
      });
      const token = jwt.sign({
        userId: user.id,
      }, process.env.ENCRYPTION_KEY as string);

      res.json({ user, token });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Email already in use" });
    }
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

