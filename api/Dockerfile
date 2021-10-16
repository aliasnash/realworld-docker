FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN apk add mc

COPY . .

#EXPOSE 3000

#CMD ["node", "./src/index.js"]
