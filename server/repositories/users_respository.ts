import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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


  createUser({ email, password, firstName, lastName, profileImage, backgroundImage, bio, rules, city, longitude, latitude }: UserPayload) {
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

  updateUser(id: number, { email, password, firstName, lastName, profileImage, backgroundImage, bio, rules, city, longitude, latitude }: UserPayload) {
    return this.db.user.update({
      where: {
        id
      },
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
}
