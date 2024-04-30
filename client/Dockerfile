FROM node:lts

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn install

COPY ./ ./

EXPOSE 80

CMD ["yarn", "preview"]