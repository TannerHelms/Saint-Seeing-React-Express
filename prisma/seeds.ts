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
          city: "Logan, Utah",
          bio: faker.lorem.paragraph(),
          longitude: -111.8338,
          latitude: 41.7370,
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
      password_hash: bcrypt.hashSync('user123'),
      profile: {
        create: {
          backgroundImage: faker.image.url(),
          profileImage: faker.image.avatar(),
          city: "Logan, Utah",
          bio: faker.lorem.paragraph(),
          longitude: 41.7370,
          latitude: -111.8338,
        }
      }
    },
    update: {
      email: "user@gmail.com",
      password_hash: bcrypt.hashSync('user'),
    }
  })

  await CreateUsers(prisma, 10);
  // await CreateConversations(prisma, 10);
  await CreateRandomRequests(prisma, 10);

  await prisma.request.upsert({
    where: {
      fromId_toId: {
        fromId: 1,
        toId: 2,
      }
    },
    create: {
      fromId: 1,
      toId: 2,
      accepted: true,
    },
    update: {
      accepted: true,
    }
  })
  await prisma.request.upsert({
    where: {
      fromId_toId: {
        fromId: 1,
        toId: 3,
      }
    },
    create: {
      fromId: 1,
      toId: 3,
      accepted: true,
    },
    update: {
      accepted: true,
    }
  })
  await prisma.request.upsert({
    where: {
      fromId_toId: {
        fromId: 1,
        toId: 4,
      }
    },
    create: {
      fromId: 1,
      toId: 4,
      accepted: true,
    },
    update: {
      accepted: true,
    }
  })
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