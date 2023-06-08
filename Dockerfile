FROM node:16
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN yarn install
COPY . .
EXPOSE 2205
CMD [ "yarn", "start" ]
