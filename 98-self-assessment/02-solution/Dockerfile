FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

ADD package.json .

RUN npm install -q

ADD . .

CMD ["npm", "start"]
