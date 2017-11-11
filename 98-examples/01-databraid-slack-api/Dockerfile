FROM node:8.1.2-alpine

RUN apk update && \
    apk add libc6-compat
RUN npm install -gq knex

RUN mkdir credentials

RUN mkdir app
WORKDIR app

ADD . .

RUN npm install

EXPOSE 8000

CMD ["npm", "run", "dev"]
