import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
import { CreateUsers } from './users';
import { faker } from '@faker-js/faker';
import CreateRandomRequests from './requests';
import CreateConversations from './conversations';
config();


async function main() {
  await prisma.user.upsert({
    where: {
      email: process.env.ADMIN_EMAIL!!,
    },
    create: {
      firstName: "SITE",
      lastName: "ADMIN",
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
      profile: {
        create: {
          backgroundImage: faker.image.url(),
          profileImage: faker.image.avatar(),
          city: faker.location.city(),
          bio: faker.lorem.paragraph(),
        }
      }
    },
    update: {
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
    }
  })

  await prisma.user.upsert({
    where: {
      email: "user@gmail.com",
    },
    create: {
      firstName: "SITE",
      lastName: "USER",
      email: "user@gmail.com",
      password_hash: bcrypt.hashSync('user'),
      profile: {
        create: {
          backgroundImage: faker.image.url(),
          profileImage: faker.image.avatar(),
          city: faker.location.city(),
          bio: faker.lorem.paragraph(),
        }
      }
    },
    update: {
      email: "user@gmail.com",
      password_hash: bcrypt.hashSync('user'),
    }
  })

  await CreateUsers(prisma, 10);
  await CreateConversations(prisma, 10);
  await CreateRandomRequests(prisma, 10);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })