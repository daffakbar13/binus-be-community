FROM node:16-alpine
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/package.json
RUN yarn install --no-lockfile
COPY . /usr/src/app/
COPY /src/configs/database/index.ts  /usr/src/app/src/
RUN yarn run build
RUN ls -lah
EXPOSE 2205
ENV NODE_ENV=production
CMD [ "yarn", "start" ]
