import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateUserPayload = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  profileImage: string,
  backgroundImage: string,
  bio: string,
  rules: string[],
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


  async createUser({ email, password, firstName, lastName, profileImage, backgroundImage, bio, rules }: CreateUserPayload) {
    return this.db.user.create({
      data: {
        email: email,
        password_hash: bcrypt.hashSync(password),
        firstName: firstName,
        lastName: lastName,
        profile: {
          create: {
            backgroundImage: backgroundImage,
            profileImage: profileImage,
            bio: bio,
            rules: rules,
          }
        }
      }
    });
  }

  async getUserById(id: number) {
    return this.db.user.findUnique({
      where: {
        id: id
      },
      include: {
        profile: true,
      }
    });
  }

  async getUsers() {
    return this.db.user.findMany({
      include: {
        profile: true,
      }
    });
  }
}