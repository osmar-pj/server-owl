FROM node:18-alpine3.16

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . .

EXPOSE 3200

CMD [ "npm", "run", "dev" ]