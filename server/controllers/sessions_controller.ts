import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

// /users/...
export const buildSessionsController = (db: PrismaClient) => {
  const router = Router();

  router.post("/", async (req, res) => {

    try {
      const user = await db.user.findUnique({
        where: {
          email: req.body.email
        }
      });

      if (user && bcrypt.compareSync(req.body.password, user.password_hash)) {
        const token = jwt.sign({
          userId: user.id,
        }, process.env.ENCRYPTION_KEY as string);
        res.json({ token });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: "Invalid email or password" })
      }
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Email or Password was missing" });
    }
  });

  return router;
}

