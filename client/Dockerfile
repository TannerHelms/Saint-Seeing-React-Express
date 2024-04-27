FROM node:lts

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn install

COPY ./ ./

EXPOSE 80

RUN chmod +x ./docker.sh

CMD ./docker.sh