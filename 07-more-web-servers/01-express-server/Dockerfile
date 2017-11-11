FROM node:9-alpine

RUN mkdir app
WORKDIR app

ADD package.json .

RUN npm install -q

EXPOSE 8000

CMD ["npm", "start"]
