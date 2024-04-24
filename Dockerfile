FROM node:lts

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn install

COPY ./ ./

RUN yarn generate

RUN yarn migrate-deploy

EXPOSE 3000

CMD [ "yarn", "dev" ]