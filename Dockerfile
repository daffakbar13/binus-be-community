FROM node:16
WORKDIR /usr/src/app
COPY ./package.json /package.json
RUN yarn install --no-lockfile
COPY . .
EXPOSE 2205
CMD [ "yarn", "start" ]
