FROM node:lts

WORKDIR /app
COPY ./package.json ./package.json
RUN npm install

RUN npm install db-migrate-pg
COPY ./prisma/ ./

RUN git clone https://github.com/vishnubob/wait-for-it.git 

RUN yarn prisma generate