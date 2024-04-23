import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import compressQueue from "../redis/config";
import dotenv from "dotenv";
dotenv.config();

export type UserPayload = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  profileImage: string,
  backgroundImage: string,
  bio: string,
  rules: string[],
  city: string,
  longitude: string,
  latitude: string,
}

export class UsersRepository {
  private db: PrismaClient
  private static instance: UsersRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): UsersRepository {
    if (!this.instance) {
      this.instance = new UsersRepository(db!!);
    }
    return this.instance;
  }


  async createUser({ email, password, firstName, lastName, profileImage, backgroundImage, bio, rules, city, longitude, latitude }: UserPayload) {
    if (profileImage) {
      const job = await this.db.compressJob.create({
        data: {
          status: "pending",
          photoUrl: process.env.SERVER_URL + profileImage,
        }
      });
      compressQueue.add("compress", { jobId: job.id });
    }
    if (backgroundImage) {
      const job = await this.db.compressJob.create({
        data: {
          status: "pending",
          photoUrl: process.env.SERVER_URL + backgroundImage,
        }
      });
      compressQueue.add("compress", { jobId: job.id });
    }
    return this.db.user.create({
      data: {
        email,
        password_hash: bcrypt.hashSync(password),
        firstName,
        lastName,
        profile: {
          create: {
            backgroundImage,
            profileImage,
            bio,
            rules,
            city,
            longitude: Number(longitude),
            latitude: Number(latitude),
          }
        }
      }
    });
  }

  getUserById(id: number) {
    return this.db.user.findUnique({
      where: {
        id: id
      },
      include: {
        profile: true,
      }
    });
  }

  getUsers() {
    return this.db.user.findMany({
      include: {
        profile: true,
      }
    });
  }

  async updateUser(id: number, { email, firstName, lastName, profileImage, backgroundImage, bio, rules, city, longitude, latitude }: UserPayload) {
    if (profileImage && !profileImage.includes("http://")) {
      const job = await this.db.compressJob.create({
        data: {
          status: "pending",
          photoUrl: profileImage,
        }
      });
      compressQueue.add("compress", { jobId: job.id, photoUrl: process.env.SERVER_URL + profileImage });
    }

    if (backgroundImage && !backgroundImage.includes("http://")) {
      const job = await this.db.compressJob.create({
        data: {
          status: "pending",
          photoUrl: backgroundImage,
        }
      });
      compressQueue.add("compress", { jobId: job.id, photoUrl: process.env.SERVER_URL + backgroundImage });
    }

    return this.db.user.update({
      where: {
        id
      },
      data: {
        email,
        firstName,
        lastName,
        profile: {
          create: {
            backgroundImage,
            profileImage,
            bio,
            rules,
            city,
            longitude: Number(longitude),
            latitude: Number(latitude),
          }
        }
      }
    });
  }

  updatePassword(id: number, password: string) {
    return this.db.user.update({
      where: {
        id
      },
      data: {
        password_hash: bcrypt.hashSync(password)
      }
    });
  }
}
