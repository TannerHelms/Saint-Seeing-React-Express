import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";
import haversine from "haversine";
import bcrypt from "bcryptjs";
import fs from "fs";
import handleFiles from "../utils/handle_files";

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
    }).filter((user) => user.id != req.user!!.id);
    res.json({ users });
  });

  // Create a user
  router.post("/", async (req, res) => {
    try {
      const rules = typeof req.body.rules == "string" ? [req.body.rules] : req.body.rules;
      const user = await usersRepository.createUser({
        ...req.body,
        rules,
      });
      req.user = user;
      const token = jwt.sign({
        userId: user.id,
      }, process.env.ENCRYPTION_KEY as string);

      const { background, profile, backgroundPath, profilePath } = handleFiles(req);
      if (background && profile) {
        await usersRepository.updateUserPhotos(user.id,
          backgroundPath,
          profilePath,
        );
      }

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

  router.put("/password", authMiddleware, async (req, res) => {
    const { current, password } = req.body;
    if (bcrypt.compareSync(current, req.user!!.password_hash)) {
      await usersRepository.updatePassword(req.user!!.id, password);
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  });

  // Update a user 
  router.put("/:id", authMiddleware, async (req, res) => {
    try {
      const { background, profile, backgroundPath, profilePath } = handleFiles(req);
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

