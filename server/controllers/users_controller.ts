import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";
import haversine from "haversine";

// Define an interface for the user object
interface User {
  // Define properties of the user object
  profile: {
    latitude: number;
    longitude: number;
    // Add other properties of the profile if needed
  };
  // Add other properties of the user object if needed
}

export const buildUsersController = (usersRepository: UsersRepository): Router => {
  const router = Router();
  // Get all users
  router.get("/", authMiddleware, async (req, res) => {
    let users = await usersRepository.getUsers();
    const us = req.user as unknown as User;
    users = users.map((user) => {
      const p1 = { longitude: us.profile.longitude, latitude: us.profile.latitude };
      const p2 = { longitude: user.profile.longitude!!, latitude: user.profile.latitude!! };
      return {
        ...user,
        distance: haversine(p1, p2).toFixed(0)
      }
    });
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
      const rules = typeof req.body.rules == "string" ? [req.body.rules] : req.body.rules;
      const user = await usersRepository.createUser({
        ...req.body,
        rules,
        backgroundImage: backgroundPath,
        profileImage: profilePath,
      });
      const token = jwt.sign({
        userId: user.id,
      }, process.env.ENCRYPTION_KEY as string);

      res.json({ user, token });
    } catch (error) {
      console.log(error)
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

  // Update a user 
  router.put("/:id", authMiddleware, async (req, res) => {
    try {
      const background = Array.isArray(req.files?.background) ? req.files.background[0] : req.files?.background;
      const profile = Array.isArray(req.files?.profile) ? req.files.profile[0] : req.files?.profile;
      const backgroundPath = `/assets/background/${Date.now()}-${background?.name}`;
      const profilePath = `/assets/avatar/${Date.now()}-${profile?.name}`;
      if (background) background.mv("." + backgroundPath);
      if (profile) profile.mv("." + profilePath);
      const rules = typeof req.body.rules == "string" ? [req.body.rules] : req.body.rules;

      let data = {
        ...req.body,
        rules,
      }
      if (background) {
        data["backgroundImage"] = backgroundPath;
      } else {
        data["backgroundImage"] = req.body.background;
      }
      if (profile) {
        data["profileImage"] = profilePath;
      } else {
        data["profileImage"] = req.body.profile;
      }

      const user = await usersRepository.updateUser(parseInt(req.params.id), data);
      res.json({ user });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update user" });
    }
  });


  return router;
}

