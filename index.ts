import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import path from "path";
import { buildConversationsController } from "./server/controllers/conversations_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { buildMessagesController } from "./server/controllers/messages_controller";
import { buildRequestsController } from "./server/controllers/requests_controller";
import { buildSessionsController } from "./server/controllers/sessions_controller";
import { buildUsersController } from "./server/controllers/users_controller";
import { ConversationsRepository } from "./server/repositories/conversations_repository";
import { MessagesRepository } from "./server/repositories/messages_repository";
import { RequestsRepository } from "./server/repositories/requests_repository";
import { UsersRepository } from "./server/repositories/users_respository";
import fileUpload from "express-fileupload";


const db = new PrismaClient();
const usersRepository = UsersRepository.getInstance(db);
const requestsRepository = RequestsRepository.getInstance(db);
const conversationsRepository = ConversationsRepository.getInstance(db);
const messagesRepository = MessagesRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const cors = require('cors');
const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors());
app.use(fileUpload());

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes("assets")) {
      res.sendFile(path.join(__dirname, req.url).replace("%20", " "));
    } else if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }

  });
}


app.use("/", buildHomeController());
app.use("/users", buildUsersController(usersRepository));
app.use("/sessions", buildSessionsController(db));
app.use("/requests", buildRequestsController(requestsRepository));
app.use("/conversations", buildConversationsController(conversationsRepository));
app.use("/messages", buildMessagesController(messagesRepository));

app.post("/upload", (req, res) => {
  const file = req.files?.file as fileUpload.UploadedFile;
  const filePath = req.body.path;
  file.mv(filePath, (err) => {
    if (err) {
      console.log(err)
      res.status(500).send(err);
    } else {
      res.send({ path: filePath });
    }
  });
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


