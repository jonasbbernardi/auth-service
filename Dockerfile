FROM node:20.12-alpine

# If need performance,
#   uncomment next line, install bcrypt package and check crypt.service.js
# RUN apk add --no-cache --virtual .gyp python3 make g++ postgresql-dev

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./src ./src
COPY ./.env ./.env

CMD [ "node", "src/server" ]