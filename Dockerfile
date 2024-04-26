FROM node:lts

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn install

COPY ./ ./

RUN yarn prisma generate

EXPOSE 3000

CMD [ "yarn", "dev" ]