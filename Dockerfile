FROM node:16-alpine
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN yarn install --no-lockfile
COPY . /usr/src/app/
COPY /src/configs/database/tsconfig.json  /usr/src/app/database/tsconfig.json
RUN yarn run build 
COPY ./dist /usr/src/app/
EXPOSE 2205
ENV NODE_ENV=production
CMD [ "yarn", "start" ]
