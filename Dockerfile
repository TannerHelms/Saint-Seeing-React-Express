FROM node:lts

WORKDIR /app

COPY ./ ./

EXPOSE 3000

RUN yarn install

CMD [ "yarn", "dev" ]