FROM node:lts-alpine

ENV API_PORT 8080

WORKDIR /home/node/app
RUN chown -R node:node /home/node/app
USER node

COPY package.json /home/node/app
RUN npm install
COPY . /home/node/app

CMD [ "npm", "run", "start" ]

EXPOSE 4040